import {
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	Icon,
	TextProps,
	Input,
	FormControl,
	InputGroup,
	Img,
	useDisclosure,
	useToast,
	Button,
} from '@chakra-ui/react';
import { useCompanies, usePicasso, useSchema, useTokens } from 'hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IEditedEmployeeInfo, IEditEmployee, ISelectedCoin } from 'types';
import {
	BlackButton,
	EditProfileIcon,
	TokenSelector,
	AlertToast,
	WaitMetamaskFinishTransaction,
} from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toCrypto, getCoinLogo, mainClient, truncateWallet } from 'utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import {
	useContractWrite,
	usePrepareContractWrite,
	useNetwork,
	useSwitchNetwork,
	useWaitForTransaction,
} from 'wagmi';
import companyAbi from 'utils/abi/company.json';

interface IEditedEmployee {
	amount: number | null;
	amountInDollar: number | null;
	admissionDate: string;
}

export const EditEmployee: React.FC<IEditEmployee> = ({
	isOpen,
	onClose,
	employee,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-team');
	const { query } = useRouter();
	const queryClient = useQueryClient();
	const toast = useToast();
	const { listOfTokens, usdtQuotation } = useTokens();
	const { editEmployeeSchema } = useSchema();
	const { updateEmployee, selectedCompany } = useCompanies();
	const [editedEmployeeData, setEditedEmployeeData] = useState<IEditedEmployee>(
		{
			amount: null,
			amountInDollar: null,
			admissionDate: '',
		}
	);
	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	} as ISelectedCoin);
	const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

	const {
		isOpen: isOpenTokenSelector,
		onOpen: onOpenTokenSelector,
		onClose: onCloseTokenSelector,
	} = useDisclosure();
	const { onClose: onCloseLoadingConfirmation } = useDisclosure();

	const labelStyle: TextProps = {
		color: 'black',
		fontSize: 'sm',
		fontWeight: 'medium',
	};
	const placeholderStyle: TextProps = {
		fontSize: 'sm',
		color: 'blackAlpha.500',
	};

	const { chain } = useNetwork();
	const { chains, switchNetworkAsync } = useSwitchNetwork();

	const expenseCalculation = () => {
		if (employee.revenue && editedEmployeeData.amountInDollar) {
			if (employee.revenue > editedEmployeeData.amountInDollar) {
				const expense = employee.revenue - editedEmployeeData.amountInDollar;
				const percentExpenses = (expense / employee.revenue) * 100;
				return {
					text: `${percentExpenses.toFixed(0)}% ${translate('less')}`,
					amount: '0',
				};
			}
			if (employee.revenue < editedEmployeeData.amountInDollar) {
				const expense = editedEmployeeData.amountInDollar - employee.revenue;
				const percentExpenses = (expense / employee.revenue) * 100;
				return {
					text: `${percentExpenses.toFixed(0)}% ${translate('more')}`,
					amount: expense.toString(),
				};
			}
		}
		if (employee.revenue && editedEmployeeData.amountInDollar === 0) {
			return {
				text: `100% ${translate('less')}`,
				amount: employee.revenue.toString(),
			};
		}
		return {
			text: `0% `,
			amount: '0',
		};
	};

	const converterToDollar = (amountInDollar: number) => {
		if (usdtQuotation.USDT?.value) {
			setEditedEmployeeData(prevState => ({
				...prevState,
				// eslint-disable-next-line no-unsafe-optional-chaining
				amountInDollar: amountInDollar * usdtQuotation.USDT?.value,
			}));
		}
	};
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<IEditedEmployeeInfo>({
		resolver: yupResolver(editEmployeeSchema),
	});

	const handleResetFormInputs = () => {
		reset();
		setIsLoadingButton(false);
		onClose();
		setEditedEmployeeData(prevState => ({
			...prevState,
			amount: 0,
			amountInDollar: 0,
		}));
	};

	const getSelectedCompanyTeams = async (id: number) => {
		const response = await mainClient.get(`/company/${id}/teams`);
		return response.data;
	};

	const { data: teams } = useQuery(
		'all-company-teams',
		() => getSelectedCompanyTeams(Number(query.id)),
		{ enabled: false }
	);

	const { config: addEmployeeConfig } = usePrepareContractWrite({
		address: selectedCompany.contract,
		abi: companyAbi,
		functionName: 'addEmployee',
		args: [
			employee.wallet,
			toCrypto(
				editedEmployeeData.amount ? editedEmployeeData.amount : 0,
				selectedCompany.tokenDecimals
			),
		],
		enabled: employee.status ? employee.status > 1 : false,
	});

	const { data: addEmployeeData, write: addEmployeeWrite } =
		useContractWrite(addEmployeeConfig);

	const { isLoading: useWaitForTransactionLoading } = useWaitForTransaction({
		hash: addEmployeeData?.hash,
		confirmations: 3,
		onSuccess() {
			handleResetFormInputs();
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="employeeAdded"
						type="success"
					/>
				),
			});
		},
		onError() {
			handleResetFormInputs();
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="weAreWorkingToSolve"
						type="error"
					/>
				),
			});
		},
	});

	const { data: editEmployeeData, write: editEmployeeWrite } = useContractWrite(
		{
			address: selectedCompany.contract,
			abi: companyAbi,
			functionName: 'updateEmployeeSalary',
			onError(error: any) {
				if (error.cause.data.args[0] === "Employee doesn't exists.") {
					toast({
						position: 'top-right',
						render: () => (
							<AlertToast
								onClick={toast.closeAll}
								text="employeeNotYetDeployed"
								type="warning"
							/>
						),
					});
					setIsLoadingButton(true);
					addEmployeeWrite?.();
				}
			},
		}
	);

	const { isLoading: useWaitForTransactionEdit } = useWaitForTransaction({
		hash: editEmployeeData?.hash,
		confirmations: 3,
		onSuccess() {
			handleResetFormInputs();
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="employeeDataChangedWithSuccessfully"
						type="success"
					/>
				),
			});
		},
		onError() {
			handleResetFormInputs();
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="weAreWorkingToSolve"
						type="error"
					/>
				),
			});
		},
	});

	const { mutate } = useMutation(
		(newDataOfEmployee: IEditedEmployeeInfo) =>
			updateEmployee(newDataOfEmployee, teams[0].id),
		{
			onSuccess: async () => {
				setIsLoadingButton(true);
				queryClient.invalidateQueries('all-company-employees');
				if (chain?.id !== 80001) await switchNetworkAsync?.(chains[2].id);
				editEmployeeWrite?.({
					args: [
						employee.wallet,
						toCrypto(
							editedEmployeeData.amount ? editedEmployeeData.amount : 0,
							selectedCompany.tokenDecimals
						),
					],
				});
			},
			onError: error => {
				setIsLoadingButton(false);
				if (error instanceof AxiosError) {
					if (error.response?.data.message === 'Unauthorized') {
						toast({
							position: 'top-right',
							render: () => (
								<AlertToast
									onClick={toast.closeAll}
									text="unauthorized"
									type="error"
								/>
							),
						});
					} else {
						toast({
							position: 'top-right',
							render: () => (
								<AlertToast
									onClick={toast.closeAll}
									text="weAreWorkingToSolve"
									type="error"
								/>
							),
						});
					}
				}
			},
		}
	);

	const handleEditEmployee = (editedEmployee: IEditedEmployeeInfo) => {
		mutate({
			asset: 'USDT',
			revenue: editedEmployee.revenue,
			userAddress: employee.wallet,
			admissionDate: editedEmployee.admissionDate,
		});
	};

	const { data: deleteEmployeeData, write: deleteEmployeeWrite } =
		useContractWrite({
			address: selectedCompany.contract,
			abi: companyAbi,
			functionName: 'updateEmployeeStatus',
			onError(error: any) {
				if (error.cause.data.args[0] === "Employee doesn't exists.") {
					toast({
						position: 'top-right',
						render: () => (
							<AlertToast
								onClick={toast.closeAll}
								text="employeeNotYetDeployed"
								type="warning"
							/>
						),
					});
					setIsLoadingButton(true);
					addEmployeeWrite?.();
				}
			},
		});

	const { isLoading: useWaitForTransactionDelete } = useWaitForTransaction({
		hash: deleteEmployeeData?.hash,
		confirmations: 3,
		onSuccess() {
			handleResetFormInputs();
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="employeeDeleted"
						type="success"
					/>
				),
			});
		},
		onError() {
			handleResetFormInputs();
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="weAreWorkingToSolve"
						type="error"
					/>
				),
			});
		},
	});

	const handleDeleteEmployee = () => {
		deleteEmployeeWrite?.({ args: [employee.wallet, false] });
	};

	return (
		<Modal isOpen={isOpen} onClose={handleResetFormInputs} size="sm">
			<ModalOverlay />
			<TokenSelector
				isOpen={isOpenTokenSelector}
				onClose={onCloseTokenSelector}
				setToken={setToken}
			/>
			<WaitMetamaskFinishTransaction
				isOpen={
					useWaitForTransactionLoading ||
					useWaitForTransactionEdit ||
					useWaitForTransactionDelete
				}
				onClose={onCloseLoadingConfirmation}
			/>
			<ModalContent
				m="auto"
				zIndex="1"
				bg="white"
				borderWidth="1px"
				borderStyle="solid"
				borderColor="black"
			>
				<Flex
					direction="column"
					w="full"
					bg={theme.bg.modal}
					borderRadius="base"
				>
					<ModalHeader display="flex" p="6" flexDir="column" gap="5">
						<Flex gap="3">
							<Icon as={EditProfileIcon} color="black" boxSize="6" pt="1" />
							<Flex direction="column">
								<Text
									color={theme.text.primary}
									fontWeight="semibold"
									fontSize="lg"
									_hover={{}}
									_active={{}}
									_focus={{}}
								>
									{translate('editEmployee')}
								</Text>
								<Text
									color={theme.text.primary}
									fontSize="sm"
									maxW="72"
									fontWeight="medium"
								>
									{employee.name?.length !== 42
										? employee.name
										: truncateWallet(employee.name)}{' '}
									- {truncateWallet(employee?.wallet)}
								</Text>
							</Flex>
							<ModalCloseButton color="gray.400" py="7" />
						</Flex>
					</ModalHeader>
					<form onSubmit={handleSubmit(handleEditEmployee)}>
						<FormControl>
							<ModalBody display="flex" flexDirection="column">
								<Flex direction="column" gap="2" pb="4">
									<Flex align="center" justify="space-between">
										<Text {...labelStyle}>
											{translate('amount')} ({translate('perMonth')})*
										</Text>
										<Text fontSize="xs" color="gray.500">
											US$&nbsp;{editedEmployeeData.amountInDollar}
										</Text>
									</Flex>
									<InputGroup>
										<Input
											type="number"
											h="max-content"
											py="1"
											{...register('revenue')}
											_placeholder={{ ...placeholderStyle }}
											placeholder="0.00"
											borderColor={errors.revenue ? 'red' : theme.bg.primary}
											flex="3"
											borderRightRadius="none"
											_hover={{}}
											_focusVisible={{}}
											color={theme.text.primary}
											onChange={amount => {
												setEditedEmployeeData(prevState => ({
													...prevState,
													amount: parseInt(amount.target.value, 10),
												}));
												converterToDollar(
													parseInt(amount.currentTarget.value, 10)
												);
												return (
													!amount.currentTarget.value &&
													setEditedEmployeeData(prevState => ({
														...prevState,
														amountInDollar: null,
														amount: null,
													}))
												);
											}}
										/>
										<Flex
											borderLeftRadius="none"
											borderRightRadius="md"
											bg={theme.bg.primary}
											_hover={{ opacity: '80%' }}
											_active={{}}
											h="2.137rem"
											_focus={{}}
											onClick={onOpenTokenSelector}
										>
											<Flex gap="2" align="center" px="4">
												<Img
													boxSize="4"
													src={getCoinLogo('USDT', listOfTokens)}
												/>
												<Text fontSize="sm">USDT</Text>
											</Flex>
										</Flex>
									</InputGroup>
									<Text fontSize="xs" color="red">
										{errors.revenue?.message}
									</Text>
									{editedEmployeeData.amountInDollar !== null && (
										<Flex
											bg="blue.50"
											py="2"
											justify="center"
											borderRadius="base"
										>
											<Text fontSize="sm" color={theme.text.primary}>
												{translate('thisChange')}
											</Text>
											<Text
												fontSize="sm"
												color={theme.text.primary}
												fontWeight="bold"
											>
												&nbsp;
												{expenseCalculation().text}
											</Text>
											<Text fontSize="sm" color={theme.text.primary}>
												&nbsp;
												{translate('expenses')}
											</Text>
										</Flex>
									)}
									{editedEmployeeData.amountInDollar !== null ||
										(editedEmployeeData.amountInDollar !== 0 && (
											<Text fontSize="xs" color={theme.text.primary}>
												{translate('pleaseNote', {
													expense: expenseCalculation().amount,
												})}
											</Text>
										))}
								</Flex>
								<Flex direction="column" gap="2" pb="8">
									<Text {...labelStyle}>{translate('dayOfAdmission')}</Text>
									<Input
										type="date"
										placeholder="0x6856...BF99"
										borderColor={
											errors.admissionDate ? 'red' : theme.bg.primary
										}
										_placeholder={{ ...placeholderStyle }}
										_focusVisible={{}}
										_hover={{}}
										color={theme.text.primary}
										{...register('admissionDate')}
										h="max-content"
										py="1"
										onChange={date =>
											setEditedEmployeeData(prevState => ({
												...prevState,
												admissionDate: date.target.value,
											}))
										}
									/>
									<Text fontSize="xs" color="red">
										{errors.admissionDate?.message}
									</Text>
								</Flex>
								<BlackButton
									py="2.5"
									type="submit"
									fontWeight="normal"
									gap="3"
									borderRadius="sm"
									mb="4"
									isDisabled={
										(editedEmployeeData.amount &&
											editedEmployeeData.amount < 0) ||
										editedEmployeeData.amount === employee.revenue
									}
									isLoading={isLoadingButton}
									maxH="10"
								>
									<Text>+</Text>
									{translate('updateEmployee')}
								</BlackButton>
								<Flex w="full" h="max-content" justify="center">
									<Button
										color="red.500"
										fontWeight="medium"
										onClick={handleDeleteEmployee}
									>
										{translate('deleteEmployee')}
									</Button>
								</Flex>
							</ModalBody>
						</FormControl>
					</form>
				</Flex>
			</ModalContent>
		</Modal>
	);
};

export default EditEmployee;

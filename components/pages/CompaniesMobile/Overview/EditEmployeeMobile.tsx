import {
	Flex,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
	Icon,
	Button,
	TextProps,
	Input,
	FormControl,
	InputGroup,
	Img,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useCompanies, usePicasso, useSchema, useTokens } from 'hooks';
import React, { useState } from 'react';
import { IEditedEmployeeInfo, IEditEmployee, ISelectedCoin } from 'types';
import {
	BlackButton,
	EditProfileIcon,
	TokenSelector,
	AlertToast,
} from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toCrypto, getCoinLogo, mainClient, truncateWallet } from 'utils';
import { MobileModalLayout } from 'layouts';
import useTranslation from 'next-translate/useTranslation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import {
	useContractWrite,
	useNetwork,
	useSwitchNetwork,
	useWaitForTransaction,
} from 'wagmi';
import companyAbi from 'utils/abi/company.json';
import { AxiosError } from 'axios';

export const EditEmployeeMobile: React.FC<IEditEmployee> = ({
	isOpen,
	onClose,
	employee,
}) => {
	const theme = usePicasso();
	const toast = useToast();
	const queryClient = useQueryClient();
	const { query } = useRouter();
	const { t: translate } = useTranslation('create-team');
	const { updateEmployee, selectedCompany, employeesRevenue } = useCompanies();
	const [editedEmployeeData, setEditedEmployeeData] = useState({
		amount: 0,
		amountInDollar: 0,
	});
	const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'bitcoin',
	} as ISelectedCoin);
	const { editEmployeeSchema } = useSchema();
	const { listOfTokens, usdtQuotation } = useTokens();

	const {
		isOpen: isOpenTokenSelector,
		onOpen: onOpenTokenSelector,
		onClose: onCloseTokenSelector,
	} = useDisclosure();

	const { chain } = useNetwork();
	const { chains, switchNetworkAsync } = useSwitchNetwork();

	const labelStyle: TextProps = {
		color: 'black',
		fontSize: 'sm',
		fontWeight: 'medium',
	};
	const placeholderStyle: TextProps = {
		fontSize: 'sm',
		color: 'blackAlpha.500',
	};

	const expenseCalculation = () => {
		if (employee.revenue && editedEmployeeData.amountInDollar > 0) {
			const newEmployeesRevenue =
				employeesRevenue - employee.revenue + editedEmployeeData.amountInDollar;
			const expense = newEmployeesRevenue - employeesRevenue;
			const percentExpenses = (expense / employeesRevenue) * 100;
			if (percentExpenses > 0) {
				return {
					text: `${percentExpenses.toFixed(0)}% ${translate('more')}`,
					amount: expense.toString(),
				};
			}
			const negativeExpensesPercent =
				((employeesRevenue - newEmployeesRevenue) / employeesRevenue) * 100;
			return {
				text: `${negativeExpensesPercent.toFixed(0)}% ${translate('less')}`,
				amount: '0',
			};
		}
		return {
			text: `0% ${translate('more')}`,
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
		register,
		handleSubmit,
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

	const { data: editEmployeeData, write: editEmployeeWrite } = useContractWrite(
		{
			address: selectedCompany.contract,
			abi: companyAbi,
			functionName: 'updateEmployeeSalary',
		}
	);

	const { isLoading: useWaitForTransactionLoading } = useWaitForTransaction({
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
						toCrypto(editedEmployeeData.amount, selectedCompany.tokenDecimals),
					],
				});
			},
			onError: error => {
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
		<MobileModalLayout isOpen={isOpen} onClose={handleResetFormInputs}>
			<Flex
				direction="column"
				w="full"
				bg={theme.bg.modal}
				borderRadius="2xl"
				pb="10"
			>
				<TokenSelector
					isOpen={isOpenTokenSelector}
					onClose={onCloseTokenSelector}
					setToken={setToken}
				/>
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
							<Flex direction="column" gap="2" pb="8">
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
											// set the new amount of the employee on the state
											setEditedEmployeeData(prevState => ({
												...prevState,
												amount: parseInt(amount.target.value, 10),
											}));
											// converts the new amount of the selected currency to dollars
											converterToDollar(
												parseInt(amount.currentTarget.value, 10)
											);
											// if the amount input is empty, the dollar value goes back to zero and set the employee's amount back to zero
											// this is for the case when the user clear the amount input after he already put something in the input
											return (
												!amount.currentTarget.value &&
												setEditedEmployeeData(prevState => ({
													...prevState,
													amountInDollar: 0,
													amount: 0,
												}))
											);
										}}
									/>
									<Button
										borderLeftRadius="none"
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
									</Button>
								</InputGroup>
								<Text fontSize="xs" color="red">
									{errors.revenue?.message}
								</Text>
								<Flex bg="blue.50" py="2" justify="center" borderRadius="base">
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
								<Text fontSize="xs" color={theme.text.primary}>
									{translate('pleaseNote', {
										expense: expenseCalculation().amount,
									})}
								</Text>
							</Flex>
							<Flex direction="column" gap="2" pb="4">
								<Text {...labelStyle}>{translate('dayOfAdmission')}</Text>
								<Input
									type="date"
									placeholder="0x6856...BF99"
									borderColor={errors.admissionDate ? 'red' : theme.bg.primary}
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
								isDisabled={editedEmployeeData.amount < 0}
								isLoading={isLoadingButton}
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
		</MobileModalLayout>
	);
};

export default EditEmployeeMobile;

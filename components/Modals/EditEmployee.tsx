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
	Button,
	TextProps,
	Input,
	FormControl,
	InputGroup,
	Img,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useCompanies, usePicasso, useSchema } from 'hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
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
import { mainClient, truncateWallet } from 'utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import {
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from 'wagmi';
import companyAbi from 'utils/abi/company.json';
import { useDebounce } from 'use-debounce';

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
	const { editEmployeeSchema } = useSchema();
	const { updateEmployee, selectedCompany, employeesRevenue } = useCompanies();
	const [editedEmployeeData, setEditedEmployeeData] = useState({
		amount: 0,
		amountInDollar: 0,
	});
	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	} as ISelectedCoin);
	const debouncedEmployeeAmount = useDebounce(editedEmployeeData.amount, 500);

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
		setEditedEmployeeData(prevState => ({
			...prevState,
			amountInDollar,
		}));
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
		onClose();
		setEditedEmployeeData(prevState => ({
			...prevState,
			amount: 0,
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

	const { config: editEmployeeConfig } = usePrepareContractWrite({
		address: selectedCompany.contract,
		abi: companyAbi,
		functionName: 'updateEmployeeSalary',
		args: [employee.wallet, debouncedEmployeeAmount[0]],
		enabled: editedEmployeeData.amount !== 0,
	});
	const { data: editEmployeeData, write: editEmployeeWrite } =
		useContractWrite(editEmployeeConfig);

	const { isLoading: useWaitForTransactionLoading } = useWaitForTransaction({
		hash: editEmployeeData?.hash,
		confirmations: 3,
		onSuccess() {
			handleResetFormInputs();
			toast({
				position: 'top',
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
				position: 'top',
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
			onSuccess: () => {
				queryClient.invalidateQueries('all-company-employees');
				editEmployeeWrite?.();
			},
			onError: error => {
				if (error instanceof AxiosError) {
					if (error.response?.data.message === 'Unauthorized') {
						toast({
							position: 'top',
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
							position: 'top',
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
			asset: token.symbol,
			revenue: editedEmployee.revenue,
			userAddress: employee.wallet,
		});
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
				isOpen={useWaitForTransactionLoading}
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
								<Text color={theme.text.primary} fontSize="sm" maxW="72">
									{employee.name} - {truncateWallet(employee?.wallet)}
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
											<Flex gap="2" align="center">
												<Img boxSize="4" src={token.logo} />
												<Text fontSize="sm" width="8" lineHeight="5">
													{token.symbol.toUpperCase()}
												</Text>
												<Icon boxSize="4" as={IoIosArrowDown} />
											</Flex>
										</Button>
									</InputGroup>
									<Text fontSize="xs" color="red">
										{errors.revenue?.message}
									</Text>
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
									<Text fontSize="xs" color={theme.text.primary}>
										{translate('pleaseNote', {
											expense: expenseCalculation().amount,
										})}
									</Text>
								</Flex>
								<BlackButton
									py="2.5"
									type="submit"
									fontWeight="normal"
									gap="3"
									borderRadius="sm"
									mb="4"
									isDisabled={!editedEmployeeData.amount}
								>
									<Text>+</Text>
									{translate('updateEmployee')}
								</BlackButton>
							</ModalBody>
						</FormControl>
					</form>
				</Flex>
			</ModalContent>
		</Modal>
	);
};

export default EditEmployee;

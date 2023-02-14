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
} from '@chakra-ui/react';
import { usePicasso, useSchema } from 'hooks';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IEditEmployee, IEditEmployeeForm, ISelectedCoin } from 'types';
import { BlackButton, EditProfileIcon, TokenSelector } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { truncateWallet } from 'utils';

export const EditEmployee: React.FC<IEditEmployee> = ({
	isOpen,
	onClose,
	employee,
}) => {
	const theme = usePicasso();
	const [editedEmployeeData, setEditedEmployeeData] = useState({
		amount: 0,
		amountInDollar: 0,
	});
	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	} as ISelectedCoin);
	const bitcoinPrice = 87586;
	const { editEmployeeSchema } = useSchema();

	const {
		isOpen: isOpenTokenSelector,
		onOpen: onOpenTokenSelector,
		onClose: onCloseTokenSelector,
	} = useDisclosure();

	const labelStyle: TextProps = {
		color: 'black',
		fontSize: 'sm',
		fontWeight: 'medium',
	};
	const placeholderStyle: TextProps = {
		fontSize: 'sm',
		color: 'blackAlpha.500',
	};

	const expenseCalculation = () => '30% more expenses.';

	const converterToDollar = (amountInDollar: number) => {
		setEditedEmployeeData(prevState => ({
			...prevState,
			amountInDollar: amountInDollar * bitcoinPrice,
		}));
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IEditEmployeeForm>({
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

	const handleEditEmployee = (editedEmployeeFormData: IEditEmployeeForm) => {
		console.log(editedEmployeeFormData);
		handleResetFormInputs();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleResetFormInputs} size="sm">
			<ModalOverlay />
			<TokenSelector
				isOpen={isOpenTokenSelector}
				onClose={onCloseTokenSelector}
				setToken={setToken}
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
									Edit Employee
								</Text>
								<Text color={theme.text.primary} fontSize="sm">
									{employee.name} - {truncateWallet(employee.wallet)}
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
										<Text {...labelStyle}>Amount (per month)*</Text>
										<Text fontSize="xs" color="gray.500">
											US$&nbsp;{editedEmployeeData.amountInDollar}
										</Text>
									</Flex>
									<InputGroup>
										<Input
											type="number"
											h="max-content"
											py="1"
											{...register('amount')}
											_placeholder={{ ...placeholderStyle }}
											placeholder="0.00"
											borderColor={errors.amount ? 'red' : theme.bg.primary}
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
													amount.currentTarget.value === '' &&
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
													{token.symbol}
												</Text>
												<Icon boxSize="4" as={IoIosArrowDown} />
											</Flex>
										</Button>
									</InputGroup>
									<Text fontSize="xs" color="red">
										{errors.amount?.message}
									</Text>
									<Flex
										bg="blue.50"
										py="2"
										justify="center"
										borderRadius="base"
									>
										<Text fontSize="sm" color={theme.text.primary}>
											This change will cause
										</Text>
										<Text
											fontSize="sm"
											color={theme.text.primary}
											fontWeight="bold"
										>
											&nbsp;
											{expenseCalculation()}
										</Text>
									</Flex>
									<Text fontSize="xs" color={theme.text.primary}>
										Please note that you will have to deposit more 0.0002 BTC in
										the companies’ funds.
									</Text>
								</Flex>
								<BlackButton
									py="2.5"
									type="submit"
									fontWeight="normal"
									gap="3"
									borderRadius="sm"
									mb="4"
									disabled={editedEmployeeData.amount === 0}
								>
									<Text>+</Text>
									Update Employee&apos;s Data
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

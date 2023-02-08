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
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IEditEmployee, IEditEmployeeForm } from 'types';
import { EditProfileIcon } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editEmployeeSchema, truncateWallet } from 'utils';

export const EditEmployee: React.FC<IEditEmployee> = ({
	isOpen,
	onClose,
	employee,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');
	const [amountInDollar, setAmountInDollar] = useState<number>(0);
	const bitcoinPrice = 87586;

	const selectedCoin = {
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	};

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

	const converterToDollar = (amount: number) => {
		setAmountInDollar(amount * bitcoinPrice);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IEditEmployeeForm>({
		resolver: yupResolver(editEmployeeSchema),
	});

	const handleEditEmployee = (editedEmployeeData: IEditEmployeeForm) => {
		console.log(editedEmployeeData);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
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
											US$&nbsp;{amountInDollar}
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
											borderColor="black"
											flex="3"
											borderRightRadius="none"
											_hover={{}}
											_focusVisible={{}}
											color={theme.text.primary}
											onChange={amount => {
												converterToDollar(
													parseInt(amount.currentTarget.value, 10)
												);
												return amount.currentTarget.value === ''
													? setAmountInDollar(0)
													: '';
											}}
										/>

										<Button
											borderLeftRadius="none"
											bg={theme.bg.primary}
											_hover={{ opacity: '80%' }}
											_active={{}}
											h="2.137rem"
											_focus={{}}
										>
											<Flex gap="2" align="center">
												<Img boxSize="4" src={selectedCoin.logo} />
												<Text fontSize="sm" width="8" lineHeight="5">
													{selectedCoin.symbol}
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

								<Flex pb="4">
									<Button
										w="full"
										type="submit"
										color="white"
										bg={theme.text.primary}
										borderRadius="sm"
										fontWeight="medium"
										size="md"
										gap="3"
										_hover={{}}
										_active={{}}
										_focus={{}}
									>
										Update Employee&apos;s Data
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

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
	Select,
	InputGroup,
	Img,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useMemo, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IEditEmployee, IEditEmployeeForm } from 'types';
import { EditProfileIcon } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editEmployeeSchema } from 'utils';

export const EditEmployee: React.FC<IEditEmployee> = ({
	isOpen,
	onClose,
	employeeName,
	employeeWalletAddress,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');
	const [amountInDollar, setAmountInDollar] = useState<number>(0);
	const [bitcoinPrice] = useState(87.586);

	const selectedCoin = {
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	};

	const labelStyle: TextProps = {
		color: 'black',
		fontSize: 'sm',
		fontWeight: '500',
	};
	const placeholderStyle: TextProps = {
		fontSize: 'sm',
		color: 'blackAlpha.500',
		fontWeight: '400',
	};

	const expenseCalculation = useMemo(() => '30% more expenses.', []);

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
						<Flex alignItems="center" gap="3">
							<Icon as={EditProfileIcon} color="black" boxSize="6" />
							<Flex direction="column">
								<Text
									color={theme.text.primary}
									fontWeight="600"
									fontSize="lg"
									_hover={{}}
									_active={{}}
									_focus={{}}
								>
									Edit Employee
								</Text>
								<Text color={theme.text.primary} fontWeight="400" fontSize="sm">
									{employeeName} - {employeeWalletAddress}
								</Text>
							</Flex>
							<ModalCloseButton color="gray.400" py="6" />
						</Flex>
					</ModalHeader>
					<form onSubmit={handleSubmit(handleEditEmployee)}>
						<FormControl>
							<ModalBody display="flex" flexDirection="column">
								<Flex direction="column" gap="2">
									<Flex align="center" justify="space-between">
										<Text {...labelStyle}>Amount (per month)*</Text>
										<Text fontWeight="400" fontSize="xs" color="gray.500">
											US$&nbsp;{amountInDollar}
										</Text>
									</Flex>
									<InputGroup>
										<Input
											type="number"
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
									<Flex bg="blue.50" py="2" justify="center">
										<Text fontSize="sm" color={theme.text.primary}>
											This change will cause
										</Text>
										<Text
											fontSize="sm"
											color={theme.text.primary}
											fontWeight="700"
										>
											&nbsp;
											{expenseCalculation}
										</Text>
									</Flex>
									<Text
										fontWeight="normal"
										fontSize="xs"
										color={theme.text.primary}
										pb="6"
									>
										Please note that you will have to deposit more 0.0002 BTC in
										the organizations’ funds.
									</Text>
								</Flex>
								<Flex direction="column" gap="2" pb="6">
									<Text {...labelStyle}>Team*</Text>
									<Select
										{...register('team')}
										placeholder="Select or Insert name to Create Team"
										borderColor={theme.text.primary}
										_placeholder={{ ...placeholderStyle }}
										_focusVisible={{}}
										color={theme.text.primary}
										_hover={{}}
										isReadOnly={false}
									>
										<option value="option1">Option 1</option>
									</Select>
									<Text fontSize="xs" color="red">
										{errors.team?.message}
									</Text>
								</Flex>
								<Flex pb="4">
									<Button
										w="full"
										type="submit"
										color="white"
										bg={theme.text.primary}
										borderRadius="sm"
										fontWeight="500"
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

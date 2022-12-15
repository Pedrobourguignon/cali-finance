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
import { UploadCsv } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { IAddEmployee, IAddEmployeeForm, ISelectedCoin } from 'types';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addEmployeeSchema } from 'utils';
import { IoIosArrowDown } from 'react-icons/io';

const teams = ['Marketing', 'Dev', 'Business'];

export const AddEmployee: React.FC<IAddEmployee> = ({
	isOpen,
	onClose,
	company,
	setEmployees,
}) => {
	const [selectedTab, setSelectedTab] = useState('Add individually');
	const [amountInDollar, setAmountInDollar] = useState<number>(0);
	const [bitcoinPrice] = useState(87.586);

	const theme = usePicasso();
	const { t: translate } = useTranslation('swap-token');

	const selectedCoin: ISelectedCoin = {
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	};

	const [individuallyOrList, setIndividuallyOrList] = useState(true);
	const shouldDisplay = individuallyOrList ? 'flex' : 'none';
	const shouldntDisplay = individuallyOrList ? 'none' : 'flex';

	const labelStyle: TextProps = {
		color: 'black',
		fontSize: 'sm',
		fontWeight: 'medium',
	};
	const placeholderStyle: TextProps = {
		fontSize: 'sm',
		color: 'blackAlpha.500',
	};

	const changeTab = (tab: string) => {
		setSelectedTab(tab);
		setIndividuallyOrList(false);
		if (selectedTab === 'Upload list') {
			setIndividuallyOrList(true);
		}
	};

	const converterToDollar = (amount: number) => {
		setAmountInDollar(amount * bitcoinPrice);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddEmployeeForm>({
		resolver: yupResolver(addEmployeeSchema),
	});

	const handleAddEmployee = (newEmployeeData: IAddEmployeeForm) => {
		setEmployees(prevState =>
			prevState.concat([
				{
					name: 'Azeitona',
					wallet: newEmployeeData.walletAddress,
					photo: '/images/avatar.png',
					amount: newEmployeeData.amount,
					coin: 'USDT',
					team: 'General',
				},
			])
		);
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
							<Icon as={IoPersonAddOutline} color="black" boxSize="6" mt="1" />
							<Flex direction="column">
								<Text
									color={theme.text.primary}
									fontWeight="semibold"
									fontSize="lg"
									_hover={{}}
									_active={{}}
									_focus={{}}
								>
									Add Employee
								</Text>
								<Text color="gray.500" fontWeight="normal" fontSize="sm">
									to: {company}
								</Text>
							</Flex>
							<ModalCloseButton color="gray.400" py="6" />
						</Flex>
						<Flex>
							<Button
								disabled={selectedTab === 'Add individually'}
								_disabled={{ color: theme.text.primary }}
								value="Add individually"
								borderRadius="none"
								fontSize="sm"
								fontWeight={
									selectedTab === 'Add individually' ? 'semibold' : 'normal'
								}
								borderBottom={
									selectedTab === 'Add individually' ? '3px solid' : 'none'
								}
								color={
									selectedTab === 'Add individually'
										? theme.text.primary
										: 'gray.500'
								}
								onClick={tab => changeTab(tab.currentTarget.value)}
								_active={{}}
								_focus={{}}
								_hover={{}}
							>
								Add individually
							</Button>
							<Button
								disabled={selectedTab === 'Upload list'}
								_disabled={{ color: theme.text.primary }}
								value="Upload list"
								borderRadius="none"
								fontSize="sm"
								fontWeight={
									selectedTab === 'Upload list' ? 'semibold' : 'normal'
								}
								onClick={tab => changeTab(tab.currentTarget.value)}
								borderBottom={
									selectedTab === 'Upload list' ? '3px solid' : 'none'
								}
								color={
									selectedTab === 'Upload list'
										? theme.text.primary
										: 'gray.500'
								}
								_active={{}}
								_focus={{}}
								_hover={{}}
							>
								Upload list
							</Button>
						</Flex>
					</ModalHeader>
					<form onSubmit={handleSubmit(handleAddEmployee)}>
						<FormControl>
							<ModalBody display={shouldDisplay} flexDirection="column" gap="4">
								<Flex direction="column" gap="2">
									<Text {...labelStyle}>Employee&apos;s Wallet Address*</Text>
									<Input
										placeholder="0x6856...BF99"
										borderColor={theme.text.primary}
										_placeholder={{ ...placeholderStyle }}
										_focusVisible={{}}
										_hover={{}}
										color={theme.text.primary}
										{...register('walletAddress')}
									/>
									<Text fontSize="xs" color="red">
										{errors.walletAddress?.message}
									</Text>
								</Flex>
								<Flex direction="column" gap="2">
									<Flex align="center" justify="space-between">
										<Text {...labelStyle}>Amount (per month)*</Text>
										<Text fontWeight="normal" fontSize="xs" color="gray.500">
											US${amountInDollar}
										</Text>
									</Flex>
									<InputGroup>
										<Input
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
								</Flex>
								<Flex direction="column" gap="2">
									<Text {...labelStyle}>Team*</Text>
									<Select
										{...register('team')}
										borderColor={theme.text.primary}
										_placeholder={{ ...placeholderStyle }}
										_focusVisible={{}}
										color={theme.text.primary}
										_hover={{}}
										isReadOnly={false}
									>
										<>
											<option
												value="option1"
												style={{ background: 'white' }}
												disabled
												selected
											>
												Select or Insert name to Create Team
											</option>
											{teams.map((team, index) => (
												<option
													value="option1"
													style={{ background: 'white' }}
													key={+index}
												>
													{team}
												</option>
											))}
										</>
									</Select>
									<Text fontSize="xs" color="red">
										{errors.team?.message}
									</Text>
								</Flex>
								<Button
									type="submit"
									color="white"
									bg={theme.text.primary}
									borderRadius="sm"
									fontWeight="normal"
									size="md"
									gap="3"
									_hover={{}}
									_active={{}}
									_focus={{}}
									onClick={onClose}
								>
									<Text>+</Text>
									Add Employee
								</Button>
								<Text
									color="gray.500"
									fontSize="xs"
									pt="3"
									pb="5"
									textAlign="center"
								>
									By adding this wallet address to your organization you accept
									the{' '}
									<Text as="u" fontWeight="semibold">
										Terms and Conditions.
									</Text>
								</Text>
							</ModalBody>
						</FormControl>
					</form>

					<Flex display={shouldntDisplay}>
						<UploadCsv />
					</Flex>
				</Flex>
			</ModalContent>
		</Modal>
	);
};

export default AddEmployee;

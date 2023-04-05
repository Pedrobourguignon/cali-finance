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
	Link,
	useToast,
} from '@chakra-ui/react';
import { AlertToast, BlackButton, TokenSelector, UploadCsv } from 'components';
import { useCompanies, usePicasso, useSchema } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import {
	IAddEmployee,
	IAddEmployeeForm,
	INewEmployee,
	ISelectedCoin,
} from 'types';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoIosArrowDown } from 'react-icons/io';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';

export const AddEmployee: React.FC<IAddEmployee> = ({ isOpen, onClose }) => {
	const { t: translate } = useTranslation('create-team');
	const [selectedTab, setSelectedTab] = useState<string>(
		translate('addIndividually')
	);
	const [addedEmployeeData, setAddedEmployeeData] = useState({
		walletAddress: '',
		amount: 0,
		amountInDollar: 0,
	});
	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'bitcoin',
	} as ISelectedCoin);
	const bitcoinPrice = 87.586;
	const { addEmployeeSchema } = useSchema();
	const { selectedCompany, addEmployeeToTeam } = useCompanies();
	const queryClient = useQueryClient();

	const toast = useToast();
	const theme = usePicasso();
	const {
		isOpen: isOpenTokenSelector,
		onOpen: onOpenTokenSelector,
		onClose: onCloseTokenSelector,
	} = useDisclosure();

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
		if (selectedTab === translate('uploadList')) {
			setIndividuallyOrList(true);
		}
	};

	const converterToDollar = (amountInDollar: number) => {
		setAddedEmployeeData(prevState => ({
			...prevState,
			amountInDollar: amountInDollar * bitcoinPrice,
		}));
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IAddEmployeeForm>({
		resolver: yupResolver(addEmployeeSchema),
	});

	const { mutate } = useMutation(
		(employee: INewEmployee) => addEmployeeToTeam(employee),
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['all-company-employees'] });
				toast({
					position: 'top',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="employeeAdded"
							type="success"
						/>
					),
				});
			},
			onError: error => {
				if (error instanceof AxiosError) {
					if (error.response?.status === 409) {
						toast({
							position: 'top',
							render: () => (
								<AlertToast
									onClick={toast.closeAll}
									text="userAlreadyExists"
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

	const handleResetFormInputs = () => {
		reset();
		onClose();
		setAddedEmployeeData(prevState => ({
			...prevState,
			amount: 0,
			walletAddress: '',
		}));
	};

	const handleAddEmployee = (newEmployeeData: IAddEmployeeForm) => {
		mutate({
			userAddress: newEmployeeData.walletAddress,
			revenue: newEmployeeData.amount,
			asset: token.symbol,
		});
		handleResetFormInputs();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleResetFormInputs} size="sm">
			<TokenSelector
				isOpen={isOpenTokenSelector}
				onClose={onCloseTokenSelector}
				setToken={setToken}
			/>
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
					<ModalHeader display="flex" px="6" flexDir="column" gap="5">
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
									{translate('addEmployee')}
								</Text>
								<Text color="gray.500" fontWeight="normal" fontSize="sm">
									{`${translate('to')} ${selectedCompany?.name}`}
								</Text>
							</Flex>
							<ModalCloseButton
								color="gray.400"
								py="7"
								onClick={() => reset()}
							/>
						</Flex>
						<Flex>
							<Button
								disabled={selectedTab === 'Add individually'}
								_disabled={{ color: theme.text.primary }}
								value={translate('addIndividually')}
								borderRadius="none"
								fontSize="sm"
								fontWeight={
									selectedTab === translate('addIndividually')
										? 'semibold'
										: 'normal'
								}
								borderBottom={
									selectedTab === translate('addIndividually')
										? '3px solid'
										: 'none'
								}
								color={
									selectedTab === translate('addIndividually')
										? theme.text.primary
										: 'gray.500'
								}
								onClick={tab => changeTab(tab.currentTarget.value)}
								_active={{}}
								_focus={{}}
								_hover={{}}
							>
								{translate('addIndividually')}
							</Button>
							<Button
								disabled={selectedTab === 'Upload list'}
								_disabled={{ color: theme.text.primary }}
								value={translate('uploadList')}
								borderRadius="none"
								fontSize="sm"
								fontWeight={
									selectedTab === translate('uploadList')
										? 'semibold'
										: 'normal'
								}
								onClick={tab => changeTab(tab.currentTarget.value)}
								borderBottom={
									selectedTab === translate('uploadList') ? '3px solid' : 'none'
								}
								color={
									selectedTab === translate('uploadList')
										? theme.text.primary
										: 'gray.500'
								}
								_active={{}}
								_focus={{}}
								_hover={{}}
							>
								{translate('uploadList')}
							</Button>
						</Flex>
					</ModalHeader>
					<form onSubmit={handleSubmit(handleAddEmployee)}>
						<FormControl>
							<ModalBody display={shouldDisplay} flexDirection="column" gap="2">
								<Flex direction="column" gap="2">
									<Text {...labelStyle}>{translate('employeeWallet')}</Text>
									<Input
										placeholder="0x6856...BF99"
										borderColor={
											errors.walletAddress ? 'red' : theme.bg.primary
										}
										_placeholder={{ ...placeholderStyle }}
										_focusVisible={{}}
										_hover={{}}
										color={theme.text.primary}
										{...register('walletAddress')}
										h="max-content"
										py="1"
										onChange={wallet =>
											setAddedEmployeeData(prevState => ({
												...prevState,
												walletAddress: wallet.target.value,
											}))
										}
									/>
									<Text fontSize="xs" color="red">
										{errors.walletAddress?.message}
									</Text>
								</Flex>
								<Flex direction="column" gap="2">
									<Flex align="center" justify="space-between">
										<Text {...labelStyle}>{translate('amountPerMonth')}</Text>
										<Text fontWeight="normal" fontSize="xs" color="gray.500">
											US${addedEmployeeData.amountInDollar}
										</Text>
									</Flex>
									<InputGroup>
										<Input
											{...register('amount')}
											_placeholder={{ ...placeholderStyle }}
											placeholder="0.00"
											borderColor={errors.amount ? 'red' : theme.bg.primary}
											flex="3"
											h="max-content"
											py="1"
											borderRightRadius="none"
											_hover={{}}
											_focusVisible={{}}
											color={theme.text.primary}
											onChange={amount => {
												setAddedEmployeeData(prevState => ({
													...prevState,
													amount: Number(amount.target.value),
												}));
												converterToDollar(
													parseInt(amount.currentTarget.value, 10)
												);
												return (
													!amount.currentTarget.value &&
													setAddedEmployeeData(prevState => ({
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
											_focus={{}}
											h="2.136rem"
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
								</Flex>
								<BlackButton
									py="2.5"
									type="submit"
									fontWeight="normal"
									gap="3"
									borderRadius="sm"
									onClick={() => handleAddEmployee}
									isDisabled={
										!addedEmployeeData.walletAddress ||
										!addedEmployeeData.amount
									}
								>
									<Text>+</Text>
									{translate('addEmployee')}
								</BlackButton>
								<Text
									color="gray.500"
									fontSize="xs"
									pt="3"
									pb="5"
									textAlign="center"
								>
									{translate('byAdding')}
									<Link href={navigationPaths.termsAndConditions} as={NextLink}>
										<Text as="u" fontWeight="semibold">
											{translate('termsAndConditions')}
										</Text>
									</Link>
								</Text>
							</ModalBody>
						</FormControl>
					</form>

					<Flex display={shouldntDisplay}>
						<UploadCsv onClose={onClose} />
					</Flex>
				</Flex>
			</ModalContent>
		</Modal>
	);
};

export default AddEmployee;

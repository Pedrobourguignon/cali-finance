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
	Link,
	useToast,
} from '@chakra-ui/react';
import { AlertToast, BlackButton, UploadCsv } from 'components';
import { useCompanies, usePicasso, useSchema, useTokens } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { IAddEmployee, IAddEmployeeForm, INewEmployee } from 'types';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCoinLogo, navigationPaths, toCrypto } from 'utils';
import NextLink from 'next/link';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { MobileModalLayout } from 'layouts';
import companyAbi from 'utils/abi/company.json';
import {
	useContractWrite,
	useNetwork,
	usePrepareContractWrite,
	useSwitchNetwork,
	useWaitForTransaction,
} from 'wagmi';
import { useDebounce } from 'use-debounce';

export const AddEmployeeMobile: React.FC<IAddEmployee> = ({
	isOpen,
	onClose,
}) => {
	const { t: translate } = useTranslation('create-team');
	const [selectedTab, setSelectedTab] = useState<string>(
		translate('addIndividually')
	);
	const [addedEmployeeData, setAddedEmployeeData] = useState({
		walletAddress: '',
		amount: 0,
		amountInDollar: 0,
	});
	const debouncedEmployeeAddress = useDebounce(
		addedEmployeeData.walletAddress,
		500
	);
	const debouncedEmployeeAmount = useDebounce(addedEmployeeData.amount, 500);
	const { addEmployeeSchema } = useSchema();
	const { selectedCompanyData, addEmployeeToTeam } = useCompanies();
	const queryClient = useQueryClient();
	const { listOfTokens, usdtQuotation } = useTokens();
	const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

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

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IAddEmployeeForm>({
		resolver: yupResolver(addEmployeeSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	const { chain } = useNetwork();
	const { chains, switchNetworkAsync, isLoading } = useSwitchNetwork();

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
		if (usdtQuotation.USDT?.value) {
			setAddedEmployeeData(prevState => ({
				...prevState,
				// eslint-disable-next-line no-unsafe-optional-chaining
				amountInDollar: amountInDollar * usdtQuotation.USDT?.value,
			}));
		}
	};

	const handleResetFormInputs = () => {
		reset();
		setIsLoadingButton(false);
		onClose();
		setAddedEmployeeData(prevState => ({
			...prevState,
			amount: 0,
			walletAddress: '',
			amountInDollar: 0,
		}));
	};

	const { config: addEmployeeConfig } = usePrepareContractWrite({
		address: selectedCompanyData?.contract,
		abi: companyAbi,
		functionName: 'addEmployee',
		args: [
			debouncedEmployeeAddress[0],
			toCrypto(debouncedEmployeeAmount[0], selectedCompanyData?.tokenDecimals),
		],
		enabled:
			addedEmployeeData.walletAddress !== '' && addedEmployeeData.amount !== 0,
	});

	const { data: addEmployeeData, write: addEmployeeWrite } =
		useContractWrite(addEmployeeConfig);

	const {
		data: useWaitForTransactionData,
		isLoading: useWaitForTransactionLoading,
	} = useWaitForTransaction({
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

	const { mutate } = useMutation(
		(employee: INewEmployee) => addEmployeeToTeam(employee),
		{
			onSuccess: async () => {
				setIsLoadingButton(true);
				queryClient.invalidateQueries({ queryKey: ['all-company-employees'] });
				if (chain?.id !== 137) await switchNetworkAsync?.(chains[3].id);
				addEmployeeWrite?.();
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
			onError: error => {
				setIsLoadingButton(false);
				if (error instanceof AxiosError) {
					if (error.response?.status === 409) {
						toast({
							position: 'top-right',
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

	const handleAddEmployee = (newEmployeeData: IAddEmployeeForm) => {
		mutate({
			userAddress: newEmployeeData.walletAddress,
			revenue: 0,
			asset: 'USDT',
		});
		handleResetFormInputs();
	};

	return (
		<MobileModalLayout isOpen={isOpen} onClose={handleResetFormInputs}>
			<Flex direction="column" w="full" bg={theme.bg.modal} borderRadius="2xl">
				{/* <TokenSelector
					isOpen={isOpenTokenSelector}
					onClose={onCloseTokenSelector}
					setToken={setToken}
				/> */}
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
								{`${translate('to')} ${selectedCompanyData?.name}`}
							</Text>
						</Flex>
						<ModalCloseButton color="gray.400" py="7" onClick={() => reset()} />
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
								selectedTab === translate('uploadList') ? 'semibold' : 'normal'
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
						<ModalBody
							display={shouldDisplay}
							flexDirection="column"
							gap="2"
							pb="10"
						>
							<Flex direction="column" gap="2">
								<Text {...labelStyle}>{translate('employeeWallet')}</Text>
								<Input
									placeholder="0x6856...BF99"
									borderColor={errors.walletAddress ? 'red' : theme.bg.primary}
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
										type="number"
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
											// set the new employee amount on the state
											setAddedEmployeeData(prevState => ({
												...prevState,
												amount: Number(amount.target.value),
											}));
											// converts the amount of the selected currency to dollars
											converterToDollar(
												parseInt(amount.currentTarget.value, 10)
											);
											// if the amount input is empty, the dollar value goes back to zero and set the employee's amount back to zero
											// this is for the case when the user clears the amount of input after he has already put something in the input
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
									<Flex
										borderLeftRadius="none"
										borderRightRadius="md"
										bg={theme.bg.primary}
										_hover={{ opacity: '80%' }}
										_active={{}}
										_focus={{}}
										h="2.136rem"
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
									{errors.amount?.message}
								</Text>
							</Flex>
							<BlackButton
								maxH="10"
								py="2.5"
								type="submit"
								fontWeight="normal"
								gap="3"
								borderRadius="sm"
								onClick={() => handleAddEmployee}
								isDisabled={
									!addedEmployeeData.walletAddress || !addedEmployeeData.amount
								}
								isLoading={isLoadingButton}
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
		</MobileModalLayout>
	);
};

export default AddEmployeeMobile;

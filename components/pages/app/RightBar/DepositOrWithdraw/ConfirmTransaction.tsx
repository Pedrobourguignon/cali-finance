import {
	Button,
	Flex,
	Img,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IContractFunctionExecutionError, ITransaction } from 'types';
import {
	useContractWrite,
	useNetwork,
	useSwitchNetwork,
	useWaitForTransaction,
} from 'wagmi';
import { AlertToast, WaitMetamaskFinishTransaction } from 'components';
import companyAbi from 'utils/abi/company.json';
import caliTokenAbi from 'utils/abi/caliToken.json';
import { useRouter } from 'next/router';
import { Hex } from 'viem';
import { formatFiat, toCrypto } from 'utils';
import {
	prepareWriteContract,
	waitForTransaction,
	writeContract,
} from '@wagmi/core';
import { subtractFee } from 'helpers';
import { GetUserCompaniesRes } from 'types/interfaces/main-server/ICompany';

interface IConfirmTransaction {
	transaction: ITransaction;
	confirm: boolean;
	setConfirm: Dispatch<SetStateAction<boolean>>;
}

export const ConfirmTransaction: React.FC<IConfirmTransaction> = ({
	transaction,
	confirm,
	setConfirm,
}) => {
	const { t: translate } = useTranslation('company-overall');
	const buttonOptions = ['deposit', 'withdrawal'];
	const toast = useToast();
	const { getCompanyById, setIsLoadingTotalFunds } = useCompanies();
	const { locale } = useRouter();
	const [selectedOption, setSelectedOption] = useState<string | undefined>(
		transaction.type
	);
	const [isLoadingApproveDeposit, setIsLoadingApproveDeposit] = useState(false);
	const [isLoadingDeposit, setIsLoadingDeposit] = useState(false);
	const [isLoadingButton, setIsLoadingButton] = useState(false);
	const [selectedCompany, setSelectedCompany] = useState<GetUserCompaniesRes>(
		{} as GetUserCompaniesRes
	);
	const { query } = useRouter();
	const depositFeeValue = 0.0;

	const getSelectedCompany = async () => {
		if (query.id) await getCompanyById(+query.id).then(setSelectedCompany);
	};

	useEffect(() => {
		getSelectedCompany();
	}, []);

	const { chain } = useNetwork();
	const {
		chains,
		isLoading: isLoadingSwitchNetwork,
		switchNetworkAsync,
	} = useSwitchNetwork({
		chainId: 8001,
	});

	const theme = usePicasso();
	const handleSelectedButton = (btnName: string) => {
		const selectedButton = buttonOptions.find(item => item === btnName);
		setSelectedOption(selectedButton);
	};

	const { onClose } = useDisclosure();

	const { write: withdrawFunds, data: withdrawFundsData } = useContractWrite({
		address: selectedCompany.contract,
		abi: companyAbi,
		functionName: 'ownerWithdraw',
		args: [toCrypto(transaction.amount, selectedCompany.tokenDecimals)],
		onError(error: any) {
			if (error.cause.data.args[0] === 'Insufficient Company Balance') {
				toast({
					position: 'top-right',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="insufficientFunds"
							type="error"
						/>
					),
				});
			}
		},
	});

	const { isLoading: isLoadingWithdrawTransaction } = useWaitForTransaction({
		hash: withdrawFundsData?.hash,
		confirmations: 3,
		onSuccess: () => {
			setIsLoadingTotalFunds(true);
			setConfirm(false);
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="successfulWithdrawal"
						type="success"
					/>
				),
			});
		},
		onError: () => {
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

	const handleDeposit = async () => {
		try {
			setIsLoadingButton(true);
			const { request } = await prepareWriteContract({
				address: selectedCompany.contract,
				abi: companyAbi,
				functionName: 'deposit',
				args: [
					selectedCompany.token,
					toCrypto(transaction.amount, selectedCompany.tokenDecimals),
				],
			});
			const { hash } = await writeContract(request);
			setIsLoadingDeposit(true);
			await waitForTransaction({
				confirmations: 3,
				hash,
			});
			setIsLoadingDeposit(false);
			setIsLoadingButton(false);
			setConfirm(false);
			setIsLoadingTotalFunds(true);
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="depositSuccessfully"
						type="success"
					/>
				),
			});
		} catch (err) {
			const error = err as IContractFunctionExecutionError;
			if (error.cause.reason.includes('transfer amount exceeds balance')) {
				toast({
					position: 'top-right',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="insufficientFunds"
							type="error"
						/>
					),
				});
				setConfirm(false);
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
				setConfirm(false);
			}
		}
	};

	const handleApproveDeposit = async () => {
		try {
			if (chain?.id !== 137) await switchNetworkAsync?.(chains[3].id);
			const { request } = await prepareWriteContract({
				address: (selectedCompany.token || '') as Hex,
				abi: caliTokenAbi,
				functionName: 'approve',
				args: [
					selectedCompany.contract,
					toCrypto(
						transaction.amount,
						selectedCompany.tokenDecimals ? selectedCompany.tokenDecimals : 0
					),
				],
			});
			const { hash } = await writeContract(request);
			setIsLoadingApproveDeposit(true);
			setIsLoadingButton(true);
			const data = await waitForTransaction({
				confirmations: 3,
				hash,
			});
			setIsLoadingApproveDeposit(false);
			setIsLoadingButton(false);
			handleDeposit();
			if (data) {
				toast({
					position: 'top-right',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="approveSuccessfully"
							type="success"
						/>
					),
				});
			}
		} catch {
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
	};

	const handleSendTransaction = async () => {
		if (transaction.type === 'deposit') {
			setIsLoadingButton(true);
			handleApproveDeposit();
		} else {
			if (chain?.id !== 137) await switchNetworkAsync?.(chains[3].id);
			setIsLoadingButton(true);
			withdrawFunds?.();
		}
	};

	return (
		<Flex
			bg="white"
			borderRadius="base"
			direction="column"
			color={theme.text.primary}
			p="4"
			gap="6"
			w="100%"
		>
			<WaitMetamaskFinishTransaction
				isOpen={
					isLoadingApproveDeposit ||
					isLoadingDeposit ||
					isLoadingWithdrawTransaction ||
					isLoadingSwitchNetwork
				}
				onClose={onClose}
			/>
			<Flex w="100%" justify="center" direction="row">
				{buttonOptions.map((item, index) => (
					<Button
						key={+index}
						bgColor={item === selectedOption ? theme.bg.primary : 'none'}
						color={item === selectedOption ? 'white' : 'gray.500'}
						onClick={() => handleSelectedButton(item)}
						h="9"
						borderRadius="full"
						disabled={item !== selectedOption}
						_hover={{}}
						_focus={{}}
						fontSize="sm"
						isDisabled={confirm}
					>
						{translate(item)}
					</Button>
				))}
			</Flex>
			<Flex direction="column" gap="4">
				<Text color={theme.text.primary} fontWeight="medium" fontSize="sm">
					{translate(`confirmTransaction.${transaction.type}`)}
				</Text>
				<Flex direction="column" gap="3">
					<Flex
						direction="column"
						gap="1.5"
						px="2"
						fontSize="xs"
						color="gray.600"
					>
						<Flex justify="space-between">
							<Text>{translate('amount')}</Text>
							<Flex align="center" gap="1">
								<Text>{formatFiat(transaction.amount)}</Text>
								<Img src={transaction.logo} boxSize="4" />
							</Flex>
						</Flex>
						{transaction.type === 'deposit' && (
							<Flex justify="space-between">
								<Text>{translate('fee')}</Text>
								<Text>{depositFeeValue} %</Text>
							</Flex>
						)}
					</Flex>
					<Flex
						justify="space-between"
						color={theme.text.primary}
						bg="gray.100"
						h="7"
						align="center"
						borderRadius="base"
						px="2"
					>
						<Text fontWeight="medium" fontSize="sm">
							{translate(`totalTransaction.${transaction.type}`)}
						</Text>
						<Flex align="center" gap="1">
							{transaction.type === 'Deposit' ? (
								<Text fontSize="sm">
									{locale && subtractFee(transaction.amount, locale)}
								</Text>
							) : (
								<Text fontSize="sm">{formatFiat(transaction.amount)}</Text>
							)}
							<Img src={transaction.logo} boxSize="4" />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction="column" gap="2">
				<Button
					bg={theme.bg.primary}
					color="white"
					w="100%"
					py="1.5"
					borderRadius="base"
					fontWeight="medium"
					h="8"
					px="6"
					whiteSpace="normal"
					fontSize="sm"
					isLoading={isLoadingButton}
					_hover={{
						opacity: 0.8,
					}}
					_focus={{}}
					_active={{
						opacity: 0.8,
					}}
					onClick={() => handleSendTransaction()}
				>
					{selectedOption?.toLowerCase() === 'deposit'
						? translate('addFunds')
						: translate('withdrawFunds')}
				</Button>
				<Button
					bg="white"
					color={theme.text.primary}
					w="100%"
					borderColor={theme.bg.primary}
					borderWidth="1px"
					borderRadius="base"
					py="1.5"
					onClick={() => setConfirm(false)}
					fontWeight="medium"
					h="8"
					px="6"
					whiteSpace="normal"
					fontSize="sm"
					_hover={{
						opacity: 0.8,
					}}
					_focus={{}}
					_active={{
						opacity: 0.8,
					}}
				>
					{translate('cancel')}
				</Button>
			</Flex>
		</Flex>
	);
};

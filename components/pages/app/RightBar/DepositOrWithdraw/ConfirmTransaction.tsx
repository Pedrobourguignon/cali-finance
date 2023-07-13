/* eslint-disable import/extensions */
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
import { Dispatch, SetStateAction, useState } from 'react';
import { ITransaction } from 'types';
import {
	useContractWrite,
	usePrepareSendTransaction,
	useSendTransaction,
	useWaitForTransaction,
} from 'wagmi';
import { useDebounce } from 'use-debounce';
import { AlertToast, WaitMetamaskFinishTransaction } from 'components';
import companyAbi from 'utils/abi/company.json';

interface IConfirmTransaction {
	transaction: ITransaction;
	setConfirm: Dispatch<SetStateAction<boolean>>;
}

export const ConfirmTransaction: React.FC<IConfirmTransaction> = ({
	transaction,
	setConfirm,
}) => {
	const { t: translate } = useTranslation('company-overall');
	const buttonOptions = [translate('deposit'), translate('withdrawal')];
	const toast = useToast();
	const { selectedCompany } = useCompanies();

	const [selectedOption, setSelectedOption] = useState<string | undefined>(
		transaction.type
	);
	const [debouncedAmount] = useDebounce(transaction.amount, 500);
	const theme = usePicasso();
	const handleSelectedButton = (btnName: string) => {
		const selectedButton = buttonOptions.find(item => item === btnName);
		setSelectedOption(selectedButton);
	};
	const [enabledTransaction, setEnabledTransaction] = useState(false);
	const { onClose } = useDisclosure();

	const { write: createCompanyWrite, data: createCompanyData } =
		useContractWrite({
			address: '0xD6461dBAc2Bbd9214a04f46DDB3E9FdFd84b5B6b',
			abi: companyAbi,
			functionName: 'deposit',
			args: [process.env.NEXT_PUBLIC_CALI_TOKEN, transaction.amount],
		});

	const { isLoading: isLoadingTransaction } = useWaitForTransaction({
		hash: createCompanyData?.hash,
		confirmations: 3,
		onSuccess: () => {
			toast({
				position: 'top',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text={
							transaction.type === 'Deposit'
								? 'depositSuccessfully'
								: 'successfulWithdrawal'
						}
						type="success"
					/>
				),
			});
		},
		onError: () => {
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

	const handleSendTransaction = () => {
		if (transaction.type === 'Deposit') {
			createCompanyWrite?.();
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
				isOpen={isLoadingTransaction}
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
					>
						{item}
					</Button>
				))}
			</Flex>
			<Flex direction="column" gap="4">
				<Text color={theme.text.primary} fontWeight="medium" fontSize="sm">
					{translate('confirmTransaction', {
						transactionType: transaction.type,
					})}
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
								<Text>{transaction.amount.toLocaleString('en-US')}</Text>
								<Img src={transaction.logo} boxSize="4" />
							</Flex>
						</Flex>
						<Flex justify="space-between">
							<Text>{translate('fee')}</Text>
							<Text>0.5%</Text>
						</Flex>
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
							{translate('totalTransaction', {
								transactionType: transaction.type,
							})}
						</Text>
						<Flex align="center" gap="1">
							<Text fontSize="sm">
								{transaction.amount.toLocaleString('en-US')}
							</Text>
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
					fontSize={{ base: 'xs', xl: 'md' }}
					_hover={{
						opacity: 0.8,
					}}
					_focus={{}}
					_active={{
						opacity: 0.8,
					}}
					onClick={() => handleSendTransaction()}
				>
					{selectedOption === translate('deposit')
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

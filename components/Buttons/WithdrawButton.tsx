import { Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import {
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from 'wagmi';
import companyAbi from 'utils/abi/company.json';
import { AlertToast, WaitMetamaskFinishTransaction } from 'components';
import { GetUserCompaniesRes } from 'types/interfaces/main-server/ICompany';

export const WithdrawButton: React.FC<{
	onClose?: () => void;
	company: GetUserCompaniesRes;
}> = ({ onClose, company }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const toast = useToast();
	const { onClose: onCloseConfirmationModal } = useDisclosure();

	const { config: withdrawConfig } = usePrepareContractWrite({
		address: company.contract,
		abi: companyAbi,
		functionName: 'withdrawToken',
	});
	const { write: writeWithdraw, data: withdrawData } =
		useContractWrite(withdrawConfig);

	const { isLoading: isLoadingWaitForTransaction } = useWaitForTransaction({
		hash: withdrawData?.hash,
		confirmations: 3,
		onSuccess() {
			onClose?.();
			toast({
				position: 'top',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="successfulWithdrawal"
						type="success"
					/>
				),
			});
		},
		onError() {
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

	return (
		<Flex w="100%">
			<WaitMetamaskFinishTransaction
				isOpen={isLoadingWaitForTransaction}
				onClose={onCloseConfirmationModal}
			/>
			<Button
				w="100%"
				bg={theme.bg.primary}
				_hover={{}}
				h="full"
				maxH="8"
				onClick={() => writeWithdraw?.()}
				py={{ lg: '1', xl: '1.5' }}
			>
				<Text fontSize="sm">{translate('withdraw')}</Text>
			</Button>
		</Flex>
	);
};

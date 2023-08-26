import { Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
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

	const { write: writeWithdraw, data: withdrawData } = useContractWrite({
		address: company.contract,
		abi: companyAbi,
		functionName: 'withdrawToken',
		onError(error: any) {
			if (error.cause.data.args[0].includes('Insufficient Company Balance')) {
				toast({
					position: 'top-right',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="companyWithoutFunds"
							type="error"
						/>
					),
				});
				onClose?.();
			}
		},
	});

	const { isLoading: isLoadingWaitForTransaction } = useWaitForTransaction({
		hash: withdrawData?.hash,
		confirmations: 3,
		onSuccess() {
			onClose?.();
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
		onError() {
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

	return (
		<Flex w="100%">
			<WaitMetamaskFinishTransaction
				isOpen={isLoadingWaitForTransaction}
				onClose={onCloseConfirmationModal}
			/>
			<Button
				w="100%"
				bg={theme.bg.primary}
				_hover={{ opacity: 0.8 }}
				_focus={{}}
				maxH="8"
				onClick={() => writeWithdraw?.()}
				py={{ lg: '1', xl: '1.5' }}
			>
				<Text fontSize="sm">{translate('withdraw')}</Text>
			</Button>
		</Flex>
	);
};

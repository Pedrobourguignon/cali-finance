import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { IUserHistory } from 'types';
import { truncateWallet } from 'utils';

interface IHistoryData {
	userHistory: IUserHistory;
}

export const HistoryData: React.FC<IHistoryData> = ({ userHistory }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');

	const handleIcon = () => {
		if (userHistory.type === 'Withdrawal') return '/icons/withdrawal.svg';
		return '/icons/deposit.svg';
	};

	const getStatusColor = () => {
		if (userHistory.status === translate('completed')) return 'green.400';
		return 'yellow.600';
	};
	return (
		<Flex
			bg="white"
			borderRadius="base"
			w="100%"
			color={theme.text.primary}
			justify="space-between"
			px="3"
			py="2"
		>
			<Flex align="center" gap="4">
				<Img src="/images/avatar.png" boxSize="6" />
				<Flex direction="column">
					<Text fontSize="sm">{truncateWallet(userHistory.wallet)}</Text>
				</Flex>
			</Flex>
			<Flex align="center" gap="4">
				<Img src={handleIcon()} boxSize="4" />
				<Flex direction="column">
					<Text fontSize="sm">{userHistory.type}</Text>
					<Text color="gray.500" fontSize="xs">
						{userHistory.date}
					</Text>
				</Flex>
			</Flex>
			<Flex direction="column" fontSize="xs">
				<Flex gap="1">
					<Text>{userHistory.amount.toLocaleString('en-US')}</Text>
					<Text>{userHistory.coin}</Text>
				</Flex>
				<Text textAlign="end" color={getStatusColor()}>
					{userHistory.status}
				</Text>
			</Flex>
		</Flex>
	);
};

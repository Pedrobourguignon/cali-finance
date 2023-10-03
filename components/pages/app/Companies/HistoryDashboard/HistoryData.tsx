import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { IHistoryNotifications } from 'types';
import {
	getNotificationsData,
	dateHandler,
	truncateWallet,
	formatFiat,
} from 'utils';

interface IHistoryData {
	userHistory: IHistoryNotifications;
}

export const HistoryData: React.FC<IHistoryData> = ({ userHistory }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	const { locale } = useRouter();

	const handleIcon = () => {
		if (
			userHistory.event.name === 'user_withdraw' ||
			userHistory.event.name === 'company_withdraw'
		)
			return '/icons/withdrawal.svg';
		return '/icons/deposit.svg';
	};

	return (
		<Flex direction="column" gap="2">
			<Flex
				display={{ base: 'none', sm: 'flex' }}
				bg="white"
				borderRadius="base"
				w="100%"
				color={theme.text.primary}
				justify="space-between"
				px="3"
				py="2"
			>
				<Flex align="center" gap="4" flex="3">
					<Img src="/images/avatar.png" boxSize="6" />
					<Flex direction="column">
						<Text fontSize="sm">
							{truncateWallet(userHistory.meta.data.userWallet)}
						</Text>
					</Flex>
				</Flex>
				<Flex align="center" justify="start" gap="4" flex="3" pl="24">
					<Img src={handleIcon()} boxSize="4" />
					<Flex direction="column">
						<Text fontSize="sm">
							{translate(getNotificationsData(userHistory.event.name)?.text)}
						</Text>
						<Text color="gray.500" fontSize="xs">
							{locale && dateHandler(userHistory.created_at, locale)}
						</Text>
					</Flex>
				</Flex>
				<Flex
					direction="column"
					fontSize="xs"
					justify="center"
					flex="3"
					align="end"
				>
					<Flex gap="1">
						<Text>{formatFiat(userHistory.meta.data.amount)}</Text>
						<Text>USDT</Text>
					</Flex>
					<Text textAlign="end" color="green.400">
						{translate('completed')}
					</Text>
				</Flex>
			</Flex>
			<Flex
				bg="white"
				display={{ base: 'flex', sm: 'none' }}
				borderRadius="base"
				w="100%"
				color={theme.text.primary}
				justify="space-between"
				px="3"
				py="2"
				align="end"
			>
				<Flex direction="column" gap="2">
					<Flex align="center" gap="4">
						<Flex
							direction="column"
							bg={theme.text.primary}
							borderRadius="full"
						>
							<Text fontSize="2xs" color={theme.text.white} px="2">
								{truncateWallet(userHistory.meta.data.userWallet)}
							</Text>
						</Flex>
					</Flex>
					<Flex align="center" gap="4">
						<Img src={handleIcon()} boxSize="4" />
						<Flex direction="column">
							<Text fontSize="xs">
								{translate(getNotificationsData(userHistory.event.name)?.text)}
							</Text>
							<Text color="gray.500" fontSize="xs">
								{locale && dateHandler(userHistory.created_at, locale)}
							</Text>
						</Flex>
					</Flex>
				</Flex>
				<Flex direction="column" fontSize="xs">
					<Flex gap="1">
						<Text>{formatFiat(userHistory.meta.data.amount)}</Text>
						<Text>USDT</Text>
					</Flex>
					<Text textAlign="end" color="green.400">
						{translate('completed')}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

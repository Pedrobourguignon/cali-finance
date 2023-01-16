import { Flex, Icon, layout, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { IHistoryNotification } from 'types';
import { layoutLimit } from 'utils';

interface IDisplayedNotifications {
	filteredNotifications: IHistoryNotification[];
	pagesVisited: number;
	notificationPerPage: number;
}

export const DisplayedNotifications: React.FC<IDisplayedNotifications> = ({
	filteredNotifications,
	pagesVisited,
	notificationPerPage,
}) => {
	const { t: translate } = useTranslation('history-page');
	const theme = usePicasso();

	const displayNotifications = filteredNotifications.slice(
		pagesVisited,
		pagesVisited + notificationPerPage
	);

	return (
		<Flex direction="column" gap="2">
			{displayNotifications.map((notification, index) => (
				<Flex
					key={+index}
					bg="white"
					px="3"
					py="2"
					borderRadius="base"
					align="center"
					justify="space-between"
				>
					<Flex align="center" gap="3">
						<Icon as={notification.companyIcon} boxSize="6" />
						<Text
							fontSize="sm"
							fontWeight="semibold"
							color={theme.text.primary}
						>
							{notification.company}
						</Text>
					</Flex>
					<Flex align="center" gap="3">
						<Icon as={notification.userIcon} boxSize="6" />
						<Flex direction="column">
							<Text fontSize="sm" color={theme.text.primary}>
								{notification.userWalletAddress}
							</Text>
							<Text fontSize="xs" color="gray.500">
								{notification.userTeam}
							</Text>
						</Flex>
					</Flex>
					<Flex align="center" gap="3">
						<Icon as={notification.typeIcon} boxSize="4" />
						<Flex direction="column">
							<Text fontSize="sm" color={theme.text.primary}>
								{translate(notification.type.toLowerCase())}
							</Text>
							<Text fontSize="xs" color="gray.500">
								{notification.date}
							</Text>
						</Flex>
					</Flex>
					<Flex direction="column" align="end" h="max-content">
						<Text color={theme.text.primary} fontSize="xs">
							{notification.value}
						</Text>
						<Text
							color={
								notification.status === 'Completed' ? 'green.400' : 'yellow.600'
							}
							fontSize="xs"
						>
							{translate(notification.status.toLowerCase())}
						</Text>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
};

export default DisplayedNotifications;

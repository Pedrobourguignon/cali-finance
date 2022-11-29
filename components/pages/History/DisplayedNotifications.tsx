import { Flex, Icon, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { IHistoryNotification } from 'types';

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

	const displayNotifications = filteredNotifications
		.slice(pagesVisited, pagesVisited + notificationPerPage)
		.map((notification, index) => (
			<Flex
				key={+index}
				bg="white"
				px="3"
				py="2"
				gap="16"
				borderRadius="base"
				align="center"
			>
				<Flex align="center" gap="3">
					<Icon as={notification.companyIcon} boxSize="6" />
					<Text fontSize="sm" fontWeight="600" color="#121212">
						{notification.company}
					</Text>
				</Flex>
				<Flex align="center" gap="3">
					<Icon as={notification.userIcon} boxSize="6" />
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="400" color="#121212">
							{notification.userWalletAddress}
						</Text>
						<Text fontSize="xs" fontWeight="400" color="gray.500">
							{notification.userTeam}
						</Text>
					</Flex>
				</Flex>
				<Flex align="center" gap="3">
					<Icon as={notification.typeIcon} boxSize="4" />
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="400" color="#121212">
							{translate(notification.type.toLowerCase())}
						</Text>
						<Text fontSize="xs" fontWeight="400" color="gray.500">
							{notification.date}
						</Text>
					</Flex>
				</Flex>
				<Flex direction="column" align="end" h="max-content">
					<Text color="#121212" fontWeight="400" fontSize="xs">
						{notification.value}
					</Text>
					<Text
						color={
							notification.status === 'Completed' ? 'green.400' : 'yellow.600'
						}
						fontWeight="400"
						fontSize="xs"
					>
						{translate(notification.status.toLowerCase())}
					</Text>
				</Flex>
			</Flex>
		));
	return (
		<Flex direction="column" gap="2">
			{displayNotifications}
		</Flex>
	);
};

export default DisplayedNotifications;

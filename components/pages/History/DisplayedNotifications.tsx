import { Flex } from '@chakra-ui/react';
import { HistoryActivityData } from 'components';
import React from 'react';
import { IDisplayedNotifications } from 'types';

export const DisplayedNotifications: React.FC<IDisplayedNotifications> = ({
	filteredNotifications,
	pagesVisited,
	notificationPerPage,
}) => {
	const displayNotifications = filteredNotifications?.slice(
		pagesVisited,
		pagesVisited + notificationPerPage
	);

	return (
		<Flex direction="column" gap="2">
			{displayNotifications?.map((notification, index) => (
				<HistoryActivityData key={+index} activities={notification} />
			))}
		</Flex>
	);
};

export default DisplayedNotifications;

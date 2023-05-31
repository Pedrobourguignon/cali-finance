import { Flex } from '@chakra-ui/react';
import React from 'react';
import { IDisplayedNotifications } from 'types';
import { HistoryActivityDataMobile } from 'components';

export const DisplayedNotificationsMobile: React.FC<
	IDisplayedNotifications
> = ({ filteredNotifications, pagesVisited, notificationPerPage }) => {
	const displayNotifications = filteredNotifications?.slice(
		pagesVisited,
		pagesVisited + notificationPerPage
	);

	return (
		<Flex direction="column" gap="2">
			{displayNotifications?.map((notification, index) => (
				<HistoryActivityDataMobile key={+index} activities={notification} />
			))}
		</Flex>
	);
};

export default DisplayedNotificationsMobile;

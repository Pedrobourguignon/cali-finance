import { Flex } from '@chakra-ui/react';
import React from 'react';
import { IDisplayedNotifications } from 'types';
import { HistoryActivityDataMobile } from 'components';

export const DisplayedNotificationsMobile: React.FC<
	IDisplayedNotifications
> = ({ filteredNotifications, pagesVisited, notificationPerPage }) => {
	const filterTeamNotifications = filteredNotifications?.filter(
		notification =>
			notification.event.name !== 'team_member_added' &&
			notification.event.name !== 'user_added_to_team'
	);
	const displayNotifications = filterTeamNotifications?.slice(
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

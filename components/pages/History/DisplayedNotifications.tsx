import { Flex } from '@chakra-ui/react';
import { HistoryActivityData } from 'components';
import React from 'react';
import { IDisplayedNotifications } from 'types';

export const DisplayedNotifications: React.FC<IDisplayedNotifications> = ({
	filteredNotifications,
	pagesVisited,
	notificationPerPage,
}) => {
	const filterTeamNotifications = filteredNotifications?.filter(
		notification =>
			notification.event.name !== 'team_member_added' &&
			notification.event.name !== 'user_added_to_company' &&
			notification.event.name !== 'user_added_to_team'
	);
	const displayNotifications = filterTeamNotifications?.slice(
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

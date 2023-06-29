import { Flex } from '@chakra-ui/react';
import { HistoryActivityData } from 'components';
import { CompaniesProvider } from 'contexts';
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

	console.log(displayNotifications);

	return (
		<CompaniesProvider>
			<Flex direction="column" gap="2">
				{displayNotifications?.map((notification, index) => (
					<HistoryActivityData key={+index} activities={notification} />
				))}
			</Flex>
		</CompaniesProvider>
	);
};

export default DisplayedNotifications;

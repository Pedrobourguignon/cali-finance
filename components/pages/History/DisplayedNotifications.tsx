/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex } from '@chakra-ui/react';
import { useCompanies } from 'hooks';
import { HistoryActivityData } from 'components';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { IDisplayedNotifications, INotificationList } from 'types';

export const DisplayedNotifications: React.FC<IDisplayedNotifications> = ({
	filteredNotifications,
	pagesVisited,
	notificationPerPage,
}) => {
	const { query } = useRouter();
	const { getCompanyById } = useCompanies();

	const { data: selectedCompany } = useQuery('created-company-overview', () =>
		getCompanyById(Number(query.id))
	);

	const [filteredUserActivities, setFilteredUserActivities] =
		useState<INotificationList[]>();

	const filterUserActivities = () => {
		setFilteredUserActivities(
			filteredNotifications?.filter(
				activitie =>
					activitie.event.description === 'Created company' ||
					activitie.event.description === 'Member added to company' ||
					activitie.event.description === 'Updated company' ||
					activitie.event.description === 'Updated user settings'
			)
		);
	};

	useEffect(() => {
		filterUserActivities();
	}, [filteredNotifications]);

	const displayNotifications = filteredUserActivities?.slice(
		pagesVisited,
		pagesVisited + notificationPerPage
	);

	return (
		<Flex direction="column" gap="2">
			{displayNotifications?.map((notification, index) => (
				<HistoryActivityData
					key={+index}
					activities={notification}
					company={selectedCompany!}
				/>
			))}
		</Flex>
	);
};

export default DisplayedNotifications;

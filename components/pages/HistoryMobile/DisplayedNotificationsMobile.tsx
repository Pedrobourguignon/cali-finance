import { Flex } from '@chakra-ui/react';
import { useCompanies } from 'hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { IDisplayedNotifications } from 'types';
import { HistoryActivityDataMobile } from 'components';

export const DisplayedNotificationsMobile: React.FC<
	IDisplayedNotifications
> = ({ filteredNotifications, pagesVisited, notificationPerPage }) => {
	const { query } = useRouter();
	const { getCompanyById } = useCompanies();

	const { data: selectedCompany } = useQuery('created-company-overview', () =>
		getCompanyById(Number(query.id))
	);

	const displayNotifications = filteredNotifications?.slice(
		pagesVisited,
		pagesVisited + notificationPerPage
	);

	return (
		<Flex direction="column" gap="2">
			{displayNotifications?.map((notification, index) => (
				<HistoryActivityDataMobile
					key={+index}
					activities={notification}
					company={selectedCompany!}
				/>
			))}
		</Flex>
	);
};

export default DisplayedNotificationsMobile;

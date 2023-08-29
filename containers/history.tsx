import { Flex } from '@chakra-ui/react';
import { HistoryComponent, HistoryComponentMobile } from 'components';
import { AuthProvider, CompaniesProvider, ProfileProvider } from 'contexts';
import { usePicasso, useProfile } from 'hooks';

import React from 'react';
import { useQuery } from 'react-query';

export const HistoryContainer = () => {
	const { getUserActivities } = useProfile();
	const theme = usePicasso();

	const { data: historyNotifications } = useQuery('all-activities', () =>
		getUserActivities(999)
	);

	return (
		<CompaniesProvider>
			<AuthProvider>
				<ProfileProvider>
					<Flex bg={theme.bg.primary} display={{ base: 'none', md: 'flex' }}>
						<HistoryComponent history={historyNotifications} />
					</Flex>
					<Flex bg={theme.bg.primary} display={{ base: 'flex', md: 'none' }}>
						<HistoryComponentMobile history={historyNotifications} />
					</Flex>
				</ProfileProvider>
			</AuthProvider>
		</CompaniesProvider>
	);
};

export default HistoryContainer;

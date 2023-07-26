import { Flex } from '@chakra-ui/react';
import { HistoryComponent, HistoryComponentMobile } from 'components';
import { AuthProvider, CompaniesProvider, ProfileProvider } from 'contexts';
import { useAuth, usePicasso, useProfile } from 'hooks';

import React from 'react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export const HistoryContainer = () => {
	const theme = usePicasso();
	const { isConnected } = useAccount();
	const { getUserActivities } = useProfile();
	const { session } = useAuth();

	const { data: historyNotifications } = useQuery(
		'all-activities',
		() => getUserActivities(999)
		// {
		// 	enabled: !!isConnected && !!session,
		// }
	);

	return (
		<CompaniesProvider>
			<ProfileProvider>
				<AuthProvider>
					<Flex bg={theme.bg.primary} display={{ base: 'none', sm: 'flex' }}>
						<HistoryComponent history={historyNotifications} />
					</Flex>
					<Flex bg={theme.bg.primary} display={{ base: 'flex', sm: 'none' }}>
						<HistoryComponentMobile history={historyNotifications} />
					</Flex>
				</AuthProvider>
			</ProfileProvider>
		</CompaniesProvider>
	);
};

export default HistoryContainer;

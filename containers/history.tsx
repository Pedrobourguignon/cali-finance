import { Flex, useMediaQuery } from '@chakra-ui/react';
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
		() => getUserActivities(999),
		{
			enabled: !!isConnected && !!session,
		}
	);
	const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

	return (
		<CompaniesProvider>
			<ProfileProvider>
				<AuthProvider>
					{isLargerThan480 ? (
						<HistoryComponent history={historyNotifications} />
					) : (
						<HistoryComponentMobile history={historyNotifications} />
					)}
				</AuthProvider>
			</ProfileProvider>
		</CompaniesProvider>
	);
};

export default HistoryContainer;

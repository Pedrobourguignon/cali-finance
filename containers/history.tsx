import { Flex } from '@chakra-ui/react';
import { HistoryComponent, HistoryComponentMobile } from 'components';
import { CompaniesProvider, ProfileProvider } from 'contexts';
import { usePicasso, useProfile } from 'hooks';
import React from 'react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export const HistoryContainer = () => {
	const theme = usePicasso();
	const { isConnected } = useAccount();
	const { getUserActivities } = useProfile();

	const { data: recentActivities } = useQuery(
		'all-activities',
		() => getUserActivities(999),
		{
			enabled: !!isConnected,
		}
	);

	return (
		<CompaniesProvider>
			<ProfileProvider>
				<Flex bg={theme.bg.primary} display={{ base: 'none', sm: 'flex' }}>
					<HistoryComponent notifications={recentActivities} />
				</Flex>
				<Flex bg={theme.bg.primary} display={{ base: 'flex', sm: 'none' }}>
					<HistoryComponentMobile notifications={recentActivities} />
				</Flex>
			</ProfileProvider>
		</CompaniesProvider>
	);
};

export default HistoryContainer;

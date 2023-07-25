import { Flex, Text, Link } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';
import { useAuth, usePicasso, useProfile } from 'hooks';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import { RecentActivitiesData } from 'components';

export const RecentActivitiesDashboard = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	const { isConnected } = useAccount();
	const { session } = useAuth();
	const { getUserActivities } = useProfile();

	const { data: allCompaniesRecentActivities } = useQuery(
		'recent-activities',
		() => getUserActivities(999),
		{
			enabled: !!isConnected && !!session,
		}
	);

	console.log(allCompaniesRecentActivities);

	return (
		<Flex
			direction="column"
			borderRadius="base"
			boxShadow="base"
			px="4"
			bg="white"
			h="max-content"
			w="full"
		>
			<Flex justify="space-between" pt="2.5" align="center">
				<Flex>
					<Text
						fontSize={{ md: 'sm', xl: 'md' }}
						fontWeight="medium"
						color={theme.text.primary}
					>
						{translate('recentActivities')}
					</Text>
				</Flex>
				<Link href={navigationPaths.dashboard.history} as={NextLink}>
					<Text
						fontSize="xs"
						cursor="pointer"
						color="gray.500"
						fontWeight="medium"
					>
						{translate('seeAll')}
					</Text>
				</Link>
			</Flex>
			{allCompaniesRecentActivities?.length === 0 ? (
				<Flex py="24" justify="center">
					<Text color={theme.text.primary} fontWeight="semibold">
						{translate('dontHaveRecentActivities')}
					</Text>
				</Flex>
			) : (
				<Flex direction="column" gap="2" py="4">
					{allCompaniesRecentActivities?.slice(0, 5).map((activity, index) => (
						<RecentActivitiesData activities={activity} key={+index} />
					))}
				</Flex>
			)}
		</Flex>
	);
};

export default RecentActivitiesDashboard;

/* eslint-disable react/jsx-no-useless-fragment */
import { Flex, Text, Link } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';
import { usePicasso, useProfile } from 'hooks';
import NextLink from 'next/link';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import { RecentActivitiesData } from 'components';

export const RecentActivitiesDashboard = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	const { isConnected } = useAccount();
	const { getUserActivities } = useProfile();

	const { data: allCompaniesRecentActivities } = useQuery(
		'recent-activities',
		() => getUserActivities(999),
		{
			enabled: !!isConnected,
		}
	);

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
			<Flex direction="column" gap="2" py="4">
				{allCompaniesRecentActivities?.slice(0, 5).map(activity => (
					<>
						{activity.event.name !== 'team_member_added' &&
							activity.event.name !== 'user_added_to_company' &&
							activity.event.name !== 'user_added_to_team' && (
								<RecentActivitiesData activities={activity} />
							)}
					</>
				))}
			</Flex>
		</Flex>
	);
};

export default RecentActivitiesDashboard;

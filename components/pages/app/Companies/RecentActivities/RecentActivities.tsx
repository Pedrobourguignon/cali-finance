import { Flex, Text, Link } from '@chakra-ui/react';
import { ActivitiesData, ActivitiesDataMobile } from 'components';
import { useAuth, useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export const RecentActivities = () => {
	const { getCompanieActivities } = useCompanies();
	const theme = usePicasso();
	const { query } = useRouter();
	const { session } = useAuth();
	const { isConnected } = useAccount();
	const { t: translate } = useTranslation('companies');
	const { t: translateDashboard } = useTranslation('dashboard');
	const { getAllCompaniesUserActivities } = useCompanies();

	const { data: recentActivities, isLoading } = useQuery(
		'recent-activities',
		() => getCompanieActivities(Number(query.id)),
		{
			enabled: !!isConnected && !!query.id && !!session,
		}
	);

	const { data: allCompaniesRecentActivities } = useQuery(
		'all-companies-recent-activities',
		getAllCompaniesUserActivities,
		{
			enabled: !!isConnected && !!session,
		}
	);

	return (
		<Flex
			boxShadow="md"
			direction="column"
			bg="white"
			px="4"
			pt="2.5"
			pb="4"
			gap="4"
			borderRadius="base"
			color={theme.text.primary}
			w="full"
		>
			<Flex justify="space-between" align="center">
				<Text fontWeight="medium" fontSize="md">
					{translate('recentActivities')}
				</Text>
				<Link
					href={navigationPaths.dashboard.history}
					as={NextLink}
					_hover={{ textDecoration: 'none' }}
				>
					<Text
						color="gray.500"
						fontSize="xs"
						cursor="pointer"
						fontWeight="medium"
						_hover={{ opacity: 0.8 }}
					>
						{translate('seeAll')}
					</Text>
				</Link>
			</Flex>
			{allCompaniesRecentActivities?.length === 0 ||
				(isLoading && (
					<Flex py="24" justify="center">
						<Text color={theme.text.primary} fontWeight="semibold">
							{translateDashboard('dontHaveCompaniesRecentActivities')}
						</Text>
					</Flex>
				))}
			<Flex gap="2" direction="column" display={{ base: 'none', md: 'flex' }}>
				{Object.keys(query).length === 0
					? allCompaniesRecentActivities
							?.slice(0, 5)
							.map((activity, index) => (
								<ActivitiesData key={+index} activities={activity} />
							))
					: recentActivities
							?.slice(0, 5)
							.map((activity, index) => (
								<ActivitiesData key={+index} activities={activity} />
							))}
			</Flex>
			<Flex gap="2" direction="column" display={{ base: 'flex', md: 'none' }}>
				{allCompaniesRecentActivities?.slice(0, 5).map((activity, index) => (
					<ActivitiesDataMobile key={+index} activities={activity} />
				))}
			</Flex>
		</Flex>
	);
};

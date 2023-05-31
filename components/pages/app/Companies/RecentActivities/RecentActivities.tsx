import { Flex, Text, Link } from '@chakra-ui/react';
import { ActivitiesData, ActivitiesDataMobile } from 'components';
import { useCompanies, usePicasso } from 'hooks';
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
	const { isConnected } = useAccount();
	const { t: translate } = useTranslation('companies');
	const { getAllCompaniesUserActivities } = useCompanies();

	const { data: recentActivities } = useQuery(
		'recent-activities',
		() => getCompanieActivities(Number(query.id)),
		{
			enabled: !!isConnected,
		}
	);

	const { data: allCompaniesRecentActivities } = useQuery(
		'all-companies-  recent-activities',
		getAllCompaniesUserActivities,
		{
			enabled: !!isConnected,
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
				<Link href={navigationPaths.dashboard.history} as={NextLink}>
					<Text
						color="gray.500"
						fontSize="xs"
						cursor="pointer"
						fontWeight="medium"
					>
						{translate('seeAll')}
					</Text>
				</Link>
			</Flex>
			<Flex gap="2" direction="column" display={{ base: 'none', sm: 'flex' }}>
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
			<Flex gap="2" direction="column" display={{ base: 'flex', sm: 'none' }}>
				{recentActivities?.map((activity, index) => (
					<ActivitiesDataMobile key={+index} activities={activity} />
				))}
			</Flex>
		</Flex>
	);
};

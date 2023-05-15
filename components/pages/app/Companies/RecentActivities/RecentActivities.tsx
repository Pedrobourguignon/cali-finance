/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Text, Link } from '@chakra-ui/react';
import {
	ActivitiesData,
	ActivitiesDataMobile,
	AllCompaniesActivitiesData,
} from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { INotificationList } from 'types';

export const RecentActivities = () => {
	const { getCompanieActivities } = useCompanies();
	const theme = usePicasso();
	const { query } = useRouter();
	const { isConnected } = useAccount();
	const { t: translate } = useTranslation('companies');
	const { getCompanyById, getAllCompaniesUserActivities } = useCompanies();

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

	console.log(allCompaniesRecentActivities);

	const [filteredActivities, setFilteredActivities] =
		useState<INotificationList[]>();
	const [filteredCompaniesActivities, setFilteredCompaniesActivities] =
		useState<INotificationList[]>();

	const { data: selectedCompany } = useQuery('created-company-overview', () =>
		getCompanyById(Number(query.id))
	);

	console.log(filteredCompaniesActivities);

	const filterActivities = () => {
		setFilteredActivities(
			recentActivities?.filter(
				activitie =>
					activitie.event.description === 'Created company' ||
					activitie.event.description === 'Member added to company'
			)
		);
		setFilteredCompaniesActivities(
			recentActivities?.filter(
				activitie =>
					activitie.event.description === 'Created company' ||
					activitie.event.description === 'Member added to company'
			)
		);
	};

	useEffect(() => {
		filterActivities();
	}, [recentActivities]);

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
					? filteredCompaniesActivities?.map((activity, index) => (
							<ActivitiesData
								key={+index}
								activities={activity}
								company={selectedCompany!}
							/>
					  ))
					: filteredActivities?.map((activity, index) => (
							<ActivitiesData
								key={+index}
								activities={activity}
								company={selectedCompany!}
							/>
					  ))}
			</Flex>
			<Flex gap="2" direction="column" display={{ base: 'flex', sm: 'none' }}>
				{filteredActivities?.map((activity, index) => (
					<ActivitiesDataMobile
						key={+index}
						activities={activity}
						company={selectedCompany!}
					/>
				))}
			</Flex>
		</Flex>
	);
};

import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	Coins,
	CreateCompanyCard,
	RecentActivitiesDashboard,
	MyAssets,
	CompaniesListFixed,
} from 'components';
import React from 'react';
import { IRecentActivitiesList } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import { useCompanies } from 'hooks';

export const DashboardComponent: React.FC = () => {
	const { t: translate } = useTranslation('dashboard');
	const { data: session } = useSession();
	const { getAllUserCompanies } = useCompanies();

	const recentActivitiesList: IRecentActivitiesList[] = [
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
		{
			type: translate('deposit'),
			date: '08 Aug 22, 20:57',
			value: '10,000 USDT',
			status: translate('completed'),
		},
	];

	const { isConnected } = useAccount();

	const { data: companies } = useQuery('all-companies', getAllUserCompanies, {
		enabled: !!isConnected,
	});

	return (
		<Flex w="full">
			<Flex direction="column" w="full">
				<Flex direction="column">
					<DashboardHeader />
					<Coins />
				</Flex>
				<Flex direction="column" gap="9" pt={!session ? '4' : 0}>
					{session ? (
						<CompaniesListFixed companies={companies} />
					) : (
						<CreateCompanyCard />
					)}
					{session && (
						<Flex justify="space-between" w="full" gap="6">
							<Flex w="full" flex="5.5">
								<MyAssets />
							</Flex>
							<Flex w="100%" h="max-content" flex={{ md: '5.5', xl: '4.5' }}>
								<RecentActivitiesDashboard
									recentActivitiesList={recentActivitiesList}
								/>
							</Flex>
						</Flex>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;

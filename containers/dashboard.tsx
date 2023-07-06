import { Flex } from '@chakra-ui/react';
import {
	DashboardComponent,
	DashboardRightBar,
	CreateAccountBanner,
	DashboardHeader,
	HaveProblemCard,
	MyAssets,
	RecentActivitiesDashboard,
	YourCompaniesMobile,
	CoinsMobile,
} from 'components';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';
import { AppLayout, MobileLayout } from 'layouts';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { IRecentActivitiesList } from 'types';

export const DashboardContainer = () => {
	const { data: session } = useSession();
	const { t: translate } = useTranslation('dashboard');

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

	return (
		<CompaniesProvider>
			<TokensProvider>
				<ProfileProvider>
					<AppLayout
						right={session ? <DashboardRightBar /> : <CreateAccountBanner />}
					>
						<Flex h="full" direction={{ base: 'column', sm: 'row' }} py="6">
							<DashboardComponent />
						</Flex>
					</AppLayout>
					<MobileLayout>
						<DashboardHeader />
						<CoinsMobile />
						<YourCompaniesMobile />
						<Flex pr="2.5">
							<MyAssets />
						</Flex>
						<Flex pt="12">
							<RecentActivitiesDashboard />
						</Flex>
						<Flex pt="10" pb="24">
							<HaveProblemCard />
						</Flex>
					</MobileLayout>
				</ProfileProvider>
			</TokensProvider>
		</CompaniesProvider>
	);
};

export default DashboardContainer;

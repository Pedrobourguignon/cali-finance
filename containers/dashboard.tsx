import { Flex } from '@chakra-ui/react';
import {
	DashboardComponent,
	DashboardRightBar,
	DashboardHeader,
	HaveProblemCard,
	MyAssets,
	RecentActivitiesDashboard,
	YourCompaniesMobile,
	CoinsMobile,
	CreateAccountBanner,
} from 'components';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';
import { useAuth } from 'hooks';
import { AppLayout, MobileLayout } from 'layouts';
import React from 'react';

export const DashboardContainer = () => {
	const { session } = useAuth();

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

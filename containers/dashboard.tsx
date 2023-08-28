import { Flex, useMediaQuery } from '@chakra-ui/react';
import {
	DashboardComponent,
	DashboardRightBar,
	DashboardHeader,
	HaveProblemCard,
	MyAssets,
	RecentActivitiesDashboard,
	YourCompaniesMobile,
	CoinsMobile,
} from 'components';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';
import { AppLayout, MobileLayout } from 'layouts';
import React from 'react';

export const DashboardContainer = () => {
	const [isLargerThan767] = useMediaQuery('(min-width: 767px)', {
		fallback: true,
	});

	return (
		<TokensProvider>
			<ProfileProvider>
				<CompaniesProvider>
					{isLargerThan767 ? (
						<AppLayout right={<DashboardRightBar />}>
							<Flex h="full" direction={{ base: 'column', sm: 'row' }} py="6">
								<DashboardComponent />
							</Flex>
						</AppLayout>
					) : (
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
					)}
				</CompaniesProvider>
			</ProfileProvider>
		</TokensProvider>
	);
};

export default DashboardContainer;

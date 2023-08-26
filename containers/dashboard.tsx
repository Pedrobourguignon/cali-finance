import { Flex, useMediaQuery } from '@chakra-ui/react';
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
import { ProfileProvider, TokensProvider } from 'contexts';
import { useAuth } from 'hooks';
import { AppLayout, MobileLayout } from 'layouts';
import React from 'react';

export const DashboardContainer = () => {
	const [isLargerThan767] = useMediaQuery('(min-width: 767px)', {
		fallback: true,
	});
	const { session } = useAuth();

	return (
		<TokensProvider>
			<ProfileProvider>
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
			</ProfileProvider>
		</TokensProvider>
	);
};

export default DashboardContainer;

import { Flex } from '@chakra-ui/react';
import {
	DashboardComponent,
	MobileHeader,
	DashboardRightBar,
	CreateAccountBanner,
} from 'components';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';
import { AppLayout } from 'layouts';
import { useSession } from 'next-auth/react';
import React from 'react';

export const DashboardContainer = () => {
	const { data: session } = useSession();
	return (
		<CompaniesProvider>
			<TokensProvider>
				<ProfileProvider>
					<AppLayout
						right={session ? <DashboardRightBar /> : <CreateAccountBanner />}
					>
						<Flex h="full" direction={{ base: 'column', sm: 'row' }} py="6">
							<MobileHeader />
							<DashboardComponent />
						</Flex>
					</AppLayout>
				</ProfileProvider>
			</TokensProvider>
		</CompaniesProvider>
	);
};

export default DashboardContainer;

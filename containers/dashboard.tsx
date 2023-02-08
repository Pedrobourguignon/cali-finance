import { Flex } from '@chakra-ui/react';
import {
	DashboardComponent,
	MobileHeader,
	DashboardRightBar,
} from 'components';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';
import { AppLayout } from 'layouts';
import React from 'react';

export const DashboardContainer = () => (
	<CompaniesProvider>
		<TokensProvider>
			<ProfileProvider>
				<AppLayout right={<DashboardRightBar />}>
					<Flex h="full" direction={{ base: 'column', sm: 'row' }} py="6">
						<MobileHeader />
						<DashboardComponent />
					</Flex>
				</AppLayout>
			</ProfileProvider>
		</TokensProvider>
	</CompaniesProvider>
);

export default DashboardContainer;

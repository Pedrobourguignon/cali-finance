import { Flex } from '@chakra-ui/react';
import {
	DashboardComponent,
	DashboardRightBar,
	MobileHeader,
} from 'components';
import { OrganizationsProvider, TokensProvider } from 'contexts';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';

import React from 'react';

export const DashboardContainer = () => {
	const theme = usePicasso();
	return (
		<OrganizationsProvider>
			<TokensProvider>
				<AppLayout right={<DashboardRightBar />}>
					<Flex h="full" direction={{ base: 'column', sm: 'row' }} py="6">
						<MobileHeader />
						<DashboardComponent />
					</Flex>
				</AppLayout>
			</TokensProvider>
		</OrganizationsProvider>
	);
};

export default DashboardContainer;

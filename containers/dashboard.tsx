import { Flex } from '@chakra-ui/react';
import { Sidebar, DashboardComponent } from 'components';
import { OrganizationsProvider } from 'contexts';
import { MobileHeader } from 'components/Header/MobileHeader';
import { usePicasso } from 'hooks';

import React from 'react';

export const DashboardContainer = () => {
	const theme = usePicasso();
	return (
		<OrganizationsProvider>
			<Flex
				bg={theme.bg.primary}
				h="100vh"
				direction={{ base: 'column', sm: 'row' }}
			>
				<MobileHeader />
				<Sidebar />
				<DashboardComponent />
			</Flex>
		</OrganizationsProvider>
	);
};

export default DashboardContainer;

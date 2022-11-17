import { Flex } from '@chakra-ui/react';
import { Sidebar, DashboardComponent } from 'components';
import { MobileHeader } from 'components/Header/MobileHeader';
import { usePicasso } from 'hooks';

import React from 'react';

export const DashboardContainer = () => {
	const theme = usePicasso();
	return (
		<Flex
			bg={theme.bg.primary}
			h="100vh"
			direction={{ base: 'column', sm: 'row' }}
		>
			<MobileHeader />
			<Sidebar />
			<DashboardComponent />
		</Flex>
	);
};

export default DashboardContainer;

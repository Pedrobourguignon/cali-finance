import { Flex } from '@chakra-ui/react';
import { Sidebar, DashboardComponent } from 'components';

import React from 'react';

export const DashboardContainer = () => (
	<Flex bg="black">
		<Sidebar />
		<DashboardComponent />
	</Flex>
);

export default DashboardContainer;

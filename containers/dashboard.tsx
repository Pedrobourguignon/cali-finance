import { Flex } from '@chakra-ui/react';
import { Sidebar, DashboardComponent } from 'components';

import React from 'react';

export const DashboardContainer = () => (
	<Flex bg="black">
		<Sidebar />
		<Flex w="full" py="6">
			<DashboardComponent />
		</Flex>
	</Flex>
);

export default DashboardContainer;

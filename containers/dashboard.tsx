import { Flex } from '@chakra-ui/react';
import { Sidebar, DashboardComponent } from 'components';

import React from 'react';

export const DashboardContainer = () => {
	const banana = 123;
	return (
		<Flex bg="black">
			<Sidebar />
			<DashboardComponent />
		</Flex>
	);
};

export default DashboardContainer;

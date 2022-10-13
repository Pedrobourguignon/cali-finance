import { Flex } from '@chakra-ui/react';
import { Sidebar } from 'components';

import React from 'react';

export const DashboardContainer = () => (
	<Flex bg="black">
		<Sidebar />
	</Flex>
);

export default DashboardContainer;

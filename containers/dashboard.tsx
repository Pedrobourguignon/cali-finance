import { Flex } from '@chakra-ui/react';
import { Sidebar } from 'components';

import React from 'react';

export const DashboardContainer = () => {
	const banana = 123;
	return (
		<Flex bg="black">
			<Sidebar />
		</Flex>
	);
};

export default DashboardContainer;

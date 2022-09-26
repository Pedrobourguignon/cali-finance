import { Flex } from '@chakra-ui/react';
import { Sidebar } from 'components';
import React from 'react';

export const DashboardContainer = () => {
	const banana = 123;
	return (
		<Flex>
			<Sidebar />
		</Flex>
	);
};

export default DashboardContainer;

import { Flex } from '@chakra-ui/react';
import { Sidebar, DashboardComponent } from 'components';
import { usePicasso } from 'hooks';

import React from 'react';

export const DashboardContainer = () => {
	const theme = usePicasso();
	return (
		<Flex bg={theme.bg.primary}>
			<Sidebar />
			<DashboardComponent />
		</Flex>
	);
};

export default DashboardContainer;

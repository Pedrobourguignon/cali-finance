import { Flex } from '@chakra-ui/react';
import { Sidebar, DashboardComponent } from 'components';
import { TokensProvider } from 'contexts';
import { usePicasso } from 'hooks';

import React from 'react';

export const DashboardContainer = () => {
	const theme = usePicasso();
	return (
		<TokensProvider>
			<Flex bg={theme.bg.primary}>
				<Sidebar />
				<DashboardComponent />
			</Flex>
		</TokensProvider>
	);
};

export default DashboardContainer;

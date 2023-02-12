import { Flex } from '@chakra-ui/react';
import { HistoryComponent, historyNotifications } from 'components';
import { CompaniesProvider } from 'contexts';
import { usePicasso } from 'hooks';
import React from 'react';

export const HistoryContainer = () => {
	const theme = usePicasso();

	return (
		<CompaniesProvider>
			<Flex bg={theme.bg.primary}>
				<HistoryComponent history={historyNotifications} />
			</Flex>
		</CompaniesProvider>
	);
};

export default HistoryContainer;

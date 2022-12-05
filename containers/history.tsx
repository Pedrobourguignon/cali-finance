import { Flex } from '@chakra-ui/react';
import { HistoryComponent, historyNotifications } from 'components';
import { usePicasso } from 'hooks';
import React from 'react';

export const HistoryContainer = () => {
	const theme = usePicasso();

	return (
		<Flex bg={theme.bg.primary}>
			<HistoryComponent history={historyNotifications} />
		</Flex>
	);
};

export default HistoryContainer;

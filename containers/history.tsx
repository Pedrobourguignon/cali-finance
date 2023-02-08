import { Flex } from '@chakra-ui/react';
import { HistoryComponent, historyNotifications } from 'components';
import { ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks';
import React from 'react';

export const HistoryContainer = () => {
	const theme = usePicasso();

	return (
		<ProfileProvider>
			<Flex bg={theme.bg.primary}>
				<HistoryComponent history={historyNotifications} />
			</Flex>
		</ProfileProvider>
	);
};

export default HistoryContainer;

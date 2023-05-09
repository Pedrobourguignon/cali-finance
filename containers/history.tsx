import { Flex } from '@chakra-ui/react';
import {
	HistoryComponent,
	HistoryComponentMobile,
	historyNotifications,
} from 'components';
import { CompaniesProvider, ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks';
import React from 'react';

export const HistoryContainer = () => {
	const theme = usePicasso();

	return (
		<CompaniesProvider>
			<ProfileProvider>
				<Flex bg={theme.bg.primary} display={{ base: 'none', sm: 'flex' }}>
					<HistoryComponent history={historyNotifications} />
				</Flex>
				<Flex bg={theme.bg.primary} display={{ base: 'flex', sm: 'none' }}>
					<HistoryComponentMobile history={historyNotifications} />
				</Flex>
			</ProfileProvider>
		</CompaniesProvider>
	);
};

export default HistoryContainer;

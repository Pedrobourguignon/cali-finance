import { Flex } from '@chakra-ui/react';
import { HistoryComponent, historyNotifications } from 'components';
import { CompaniesProvider, ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks';
import React from 'react';

export const HistoryContainer = () => {
	const theme = usePicasso();

	return (
		<CompaniesProvider>
			<ProfileProvider>
				<Flex bg={theme.bg.primary}>
					<HistoryComponent history={historyNotifications} />
				</Flex>
			</ProfileProvider>
		</CompaniesProvider>
	);
};

export default HistoryContainer;

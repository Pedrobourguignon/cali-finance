import { HistoryContainer } from 'containers';
import { ProfileProvider } from 'contexts';
import React from 'react';

const History = () => (
	<ProfileProvider>
		<HistoryContainer />
	</ProfileProvider>
);

export default History;

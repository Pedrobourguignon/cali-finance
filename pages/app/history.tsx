import { HistoryContainer } from 'containers';
import { AuthProvider, ProfileProvider } from 'contexts';
import React from 'react';

const History = () => (
	<AuthProvider>
		<ProfileProvider>
			<HistoryContainer />
		</ProfileProvider>
	</AuthProvider>
);

export default History;

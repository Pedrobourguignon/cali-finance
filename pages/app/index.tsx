import { DashboardContainer } from 'containers';
import { TokensProvider } from 'contexts';
import React from 'react';

const Dashboard = () => (
	<TokensProvider>
		<DashboardContainer />;
	</TokensProvider>
);

export default Dashboard;

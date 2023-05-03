import { DashboardContainer } from 'containers';
import { CompaniesProvider, TokensProvider } from 'contexts';
import React from 'react';

const Dashboard = () => (
	<TokensProvider>
		<CompaniesProvider>
			<DashboardContainer />
		</CompaniesProvider>
	</TokensProvider>
);

export default Dashboard;

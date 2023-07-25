import { DashboardContainer } from 'containers';
import { AuthProvider, CompaniesProvider, TokensProvider } from 'contexts';
import React from 'react';

const Dashboard = () => (
	<TokensProvider>
		<CompaniesProvider>
			<AuthProvider>
				<DashboardContainer />
			</AuthProvider>
		</CompaniesProvider>
	</TokensProvider>
);

export default Dashboard;

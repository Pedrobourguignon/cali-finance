import { DashboardContainer } from 'containers';
import { AuthProvider, CompaniesProvider, TokensProvider } from 'contexts';
import React from 'react';

const Dashboard = () => (
	<TokensProvider>
		<AuthProvider>
			<CompaniesProvider>
				<DashboardContainer />
			</CompaniesProvider>
		</AuthProvider>
	</TokensProvider>
);

export default Dashboard;

import { DashboardContainer } from 'containers';
import {
	AuthProvider,
	CompaniesProvider,
	ProfileProvider,
	TokensProvider,
} from 'contexts';
import React from 'react';

const Dashboard = () => (
	<TokensProvider>
		<AuthProvider>
			<ProfileProvider>
				<CompaniesProvider>
					<DashboardContainer />
				</CompaniesProvider>
			</ProfileProvider>
		</AuthProvider>
	</TokensProvider>
);

export default Dashboard;

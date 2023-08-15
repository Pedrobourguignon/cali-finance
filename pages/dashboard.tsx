import { DashboardContainer } from 'containers';
import { AuthProvider } from 'contexts';
import React from 'react';

const Dashboard = () => (
	<AuthProvider>
		<DashboardContainer />
	</AuthProvider>
);

export default Dashboard;

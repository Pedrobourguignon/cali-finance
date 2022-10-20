import {
	DashboardHeader,
	CreateOrganizationCard,
	NewOrganizationsDashboard,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { AppLayout } from './appLayout';

export const OrganizationsConnected: React.FC = () => {
	const theme = usePicasso();
	return (
		<AppLayout>
			<DashboardHeader />
			<NewOrganizationsDashboard />
			<CreateOrganizationCard />
		</AppLayout>
	);
};

export default OrganizationsConnected;

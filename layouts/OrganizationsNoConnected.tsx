import {
	DashboardHeader,
	CreateOrganizationCard,
	OrganizationsDashboardNoConnected,
	SwapTokenBar,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { AppLayout } from './appLayout';

export const OrganizationsLayoutNoConnected: React.FC = () => {
	const theme = usePicasso();
	return (
		<AppLayout right={<SwapTokenBar />}>
			<DashboardHeader />
			<OrganizationsDashboardNoConnected />
			<CreateOrganizationCard />
		</AppLayout>
	);
};

export default OrganizationsLayoutNoConnected;

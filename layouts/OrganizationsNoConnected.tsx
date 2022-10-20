import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateOrganizationCard,
	OrganizationsDashboardNoConnected,
} from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { AppLayout } from './appLayout';

export const OrganizationsLayoutNoConnected: React.FC = () => {
	const theme = usePicasso();
	return (
		<AppLayout>
			<DashboardHeader />
			<OrganizationsDashboardNoConnected />
			<CreateOrganizationCard />
		</AppLayout>
	);
};

export default OrganizationsLayoutNoConnected;

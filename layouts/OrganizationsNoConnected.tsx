import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateOrganizationCard,
	OrganizationsDashboardNoConnected,
	SwapTokenBar,
} from 'components';
import React from 'react';
import { AppLayout } from 'layouts';

export const OrganizationsLayoutNoConnected: React.FC = () => (
	<AppLayout right={<SwapTokenBar />}>
		<Flex direction="column" gap="4" p="6">
			<DashboardHeader />
			<OrganizationsDashboardNoConnected />
			<CreateOrganizationCard />
		</Flex>
	</AppLayout>
);

export default OrganizationsLayoutNoConnected;

import { Flex } from '@chakra-ui/react';
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
			<Flex direction="column" gap="4" p="6">
				<DashboardHeader />
				<OrganizationsDashboardNoConnected />
				<CreateOrganizationCard />
			</Flex>
		</AppLayout>
	);
};

export default OrganizationsLayoutNoConnected;

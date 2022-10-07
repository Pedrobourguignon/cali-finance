import { Flex } from '@chakra-ui/react';
import {
	NewOrganizationLinks,
	NewOrganizationsDashboard,
	OrganizationsDashboard,
	OrganizationsDashboardNoConnected,
	RecentActivities,
} from 'components';
import type { NextPage } from 'next';

const Home: NextPage = () => (
	<Flex direction="column">
		<OrganizationsDashboard />
		<RecentActivities />
		<OrganizationsDashboardNoConnected />
		<NewOrganizationsDashboard />
		<NewOrganizationLinks />
	</Flex>
);

export default Home;

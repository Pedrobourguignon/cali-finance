import { Flex } from '@chakra-ui/react';
import {
	NewOrganizationLinks,
	NewOrganizationsDashboard,
	OrganizationsDashboard,
	OrganizationsDashboardNoConnected,
	RecentActivities,
	UpgradeAccountBanner,
} from 'components';
import type { NextPage } from 'next';

const Home: NextPage = () => (
	<Flex direction="column">
		<OrganizationsDashboard />
		<RecentActivities />
		<OrganizationsDashboardNoConnected />
		<NewOrganizationsDashboard />
		<NewOrganizationLinks />
		<UpgradeAccountBanner />
	</Flex>
);

export default Home;

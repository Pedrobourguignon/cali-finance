import { Flex } from '@chakra-ui/react';
import { OrganizationsDashboard } from 'components/OrganizationsDashboard/OrganizationsDashboard';
import { RecentActivities } from 'components/RecentActivities/RecentActivities';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	const banana = 123;
	return (
		<Flex direction="column">
			<OrganizationsDashboard />
			<RecentActivities />
		</Flex>
	);
};

export default Home;

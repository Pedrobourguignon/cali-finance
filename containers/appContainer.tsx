import { Flex } from '@chakra-ui/react';
import {
	CreateOrganizationCard,
	DashboardHeader,
	NewOrganizationsDashboard,
	SwapTokenBar,
} from 'components';
import { AppLayout } from 'layouts';

export const AppContainer: React.FC = () => (
	<Flex>
		<AppLayout right={<SwapTokenBar />}>
			<DashboardHeader />
			<NewOrganizationsDashboard />
			<CreateOrganizationCard />
		</AppLayout>
	</Flex>
);

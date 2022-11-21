import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateOrganizationCard,
	SwapTokenBar,
	RecentActivities,
	OrganizationsDashboard,
	YourOrganizations,
} from 'components';
import { AppLayout } from 'layouts';
import { useOrganizations } from 'hooks';

export const OrganizationsConnected: React.FC = () => {
	const { organizations, activities, totalFunds, totalMembers, totalTeams } =
		useOrganizations();

	return (
		<AppLayout right={<SwapTokenBar />}>
			<Flex p="6" direction="column" gap="4" w="min-content">
				<DashboardHeader />
				<OrganizationsDashboard
					members={totalMembers}
					organizationsCount={organizations.length}
					teams={totalTeams}
					totalFunds={totalFunds}
				/>
				<Flex w="full" flexDir="column" gap="8">
					{organizations.length ? (
						<YourOrganizations />
					) : (
						<CreateOrganizationCard />
					)}
					{activities ? <RecentActivities /> : ''}
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default OrganizationsConnected;
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
	const { organization, activities, totalFunds, totalMembers, totalTeams } =
		useOrganizations();

	return (
		<AppLayout right={<SwapTokenBar />}>
			<Flex p="6" direction="column" gap="4">
				<DashboardHeader />
				<OrganizationsDashboard
					members={totalMembers}
					organizations={organization.length.toString()}
					teams={totalTeams}
					totalFunds={totalFunds}
				/>
				{organization.length > 0 ? (
					<YourOrganizations />
				) : (
					<CreateOrganizationCard />
				)}
				{activities ? <RecentActivities /> : ''}
			</Flex>
		</AppLayout>
	);
};

export default OrganizationsConnected;

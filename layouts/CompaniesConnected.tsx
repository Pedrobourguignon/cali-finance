import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateCompanyCard,
	SwapTokenBar,
	RecentActivities,
	CompaniesDashboard,
	YourCompanies,
} from 'components';
import { AppLayout } from 'layouts';
import { useCompanies } from 'hooks';

export const CompaniesConnected: React.FC = () => {
	const { companies, activities, totalFunds, totalMembers, totalTeams } =
		useCompanies();

	return (
		<AppLayout right={<SwapTokenBar />}>
			<Flex direction="column" gap="8" py="6" w="100%">
				<DashboardHeader />
				<CompaniesDashboard
					members={totalMembers}
					companiesCount={companies.length}
					teams={totalTeams}
					totalFunds={totalFunds}
				/>
				<Flex w="full" flexDir="column" gap={{ md: '4', xl: '8' }}>
					{companies.length ? <YourCompanies /> : <CreateCompanyCard />}
					{activities && <RecentActivities />}
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default CompaniesConnected;

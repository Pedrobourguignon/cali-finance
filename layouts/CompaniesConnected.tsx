import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateCompanyCard,
	RecentActivities,
	CompaniesDashboard,
	YourCompanies,
	CompaniesRightBar,
	CompaniesList,
} from 'components';
import { AppLayout } from 'layouts';
import { useCompanies } from 'hooks';

export const CompaniesConnected: React.FC = () => {
	const { companies, activities, totalFunds, totalMembers, totalTeams } =
		useCompanies();

	return (
		<AppLayout right={<CompaniesRightBar />}>
			<Flex direction="column" gap="2.75rem" pt="6" w="100%">
				<Flex direction="column">
					<DashboardHeader />
					<CompaniesDashboard
						members={totalMembers}
						companiesCount={companies.length}
						teams={totalTeams}
						totalFunds={totalFunds}
					/>
				</Flex>
				<Flex w="full" flexDir="column" gap="8">
					{companies.length ? <CompaniesList /> : <CreateCompanyCard />}
					{activities && <RecentActivities />}
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default CompaniesConnected;

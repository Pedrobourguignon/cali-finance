import { Flex } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateCompanyCard,
	RecentActivities,
	CompaniesDashboard,
	YourCompanies,
	CompaniesRightBar,
} from 'components';
import { AppLayout } from 'layouts';
import { useCompanies } from 'hooks';

export const CompaniesConnected: React.FC = () => {
	const { companies, activities, totalFunds, totalMembers, totalTeams } =
		useCompanies();

	return (
		<AppLayout right={<CompaniesRightBar />}>
			<Flex direction="column" gap="2.75rem" py="6" w="100%">
				<Flex direction="column">
					<DashboardHeader />
					<CompaniesDashboard
						members={totalMembers}
						companiesCount={companies.length}
						teams={totalTeams}
						totalFunds={totalFunds}
					/>
				</Flex>
				<Flex w="full" flexDir="column" gap={{ md: '4', xl: '8' }}>
					{companies.length ? <YourCompanies /> : <CreateCompanyCard />}
					{activities && <RecentActivities />}
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default CompaniesConnected;

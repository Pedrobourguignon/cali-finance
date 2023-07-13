import { Flex } from '@chakra-ui/react';
import {
	RecentActivities,
	HaveProblemCard,
	DashboardHeader,
	CompaniesDashboardMobile,
	YourCompaniesMobile,
} from 'components';
import { MobileLayout } from 'layouts';
import { useCompanies } from 'hooks';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export const CompaniesConnectedMobile: React.FC = () => {
	const { getAllUserCompanies } = useCompanies();
	const { isConnected } = useAccount();

	const { data: companies } = useQuery('all-companies', getAllUserCompanies, {
		enabled: !!isConnected,
	});

	return (
		<MobileLayout>
			<Flex direction="column" w="100%">
				<Flex direction="column" pt="2">
					<DashboardHeader />
					<CompaniesDashboardMobile
						members={17}
						companiesCount={companies?.length}
						teams={1}
						totalFunds={67900}
					/>
				</Flex>
				<YourCompaniesMobile />
				<Flex w="full" flexDir="column" gap="8">
					<RecentActivities />
				</Flex>
			</Flex>
			<Flex pt="10" pb="24">
				<HaveProblemCard />
			</Flex>
		</MobileLayout>
	);
};

export default CompaniesConnectedMobile;

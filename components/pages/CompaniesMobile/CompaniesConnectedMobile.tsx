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
import { useSession } from 'next-auth/react';

export const CompaniesConnectedMobile: React.FC = () => {
	const { getCompaniesOverview } = useCompanies();
	const { isConnected } = useAccount();
	const { data: session } = useSession();

	const { data: companies } = useQuery(
		'all-companies-overview',
		getCompaniesOverview,
		{
			enabled: !!isConnected && !!session,
		}
	);

	return (
		<MobileLayout>
			<Flex direction="column" w="100%" gap="11">
				<Flex direction="column" pt="2">
					<DashboardHeader />
					<CompaniesDashboardMobile
						members={companies?.members ? companies.members : 0}
						companiesCount={companies?.companies}
						teams={1}
						totalFunds={companies?.totalFunds ? companies.totalFunds : 0}
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

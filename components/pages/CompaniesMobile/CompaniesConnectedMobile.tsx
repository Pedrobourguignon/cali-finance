import { Flex, Text } from '@chakra-ui/react';
import { RecentActivities, HaveProblemCard, DashboardHeader } from 'components';
import { MobileLayout } from 'layouts';
import { useCompanies, usePicasso } from 'hooks';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import useTranslation from 'next-translate/useTranslation';
import { CompaniesDashboardMobile } from './CompaniesDashboardMobile';

export const CompaniesConnectedMobile: React.FC = () => {
	const { activities, getAllUserCompanies } = useCompanies();
	const { isConnected } = useAccount();
	const { t: translate } = useTranslation('dashboard');

	const { data: companies } = useQuery('all-companies', getAllUserCompanies, {
		enabled: !!isConnected,
	});

	return (
		<MobileLayout>
			<Flex direction="column" w="100%">
				<Flex direction="column">
					<DashboardHeader />
					<CompaniesDashboardMobile
						members={17}
						companiesCount={companies?.length}
						teams={1}
						totalFunds={67900}
					/>
				</Flex>
				<Flex w="full" flexDir="column" gap="8" pt="10">
					{activities && <RecentActivities />}
				</Flex>
			</Flex>
			<Flex py="4">
				<HaveProblemCard />
			</Flex>
		</MobileLayout>
	);
};

export default CompaniesConnectedMobile;

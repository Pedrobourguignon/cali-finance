import { Flex, Text } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateCompanyCard,
	RecentActivities,
	CompaniesDashboard,
	CompaniesRightBar,
	CompaniesListFixed,
} from 'components';
import { AppLayout } from 'layouts';
import { useCompanies, usePicasso } from 'hooks';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import useTranslation from 'next-translate/useTranslation';

export const CompaniesConnected: React.FC = () => {
	const { getAllUserCompanies } = useCompanies();
	const { isConnected } = useAccount();
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();

	const { data: companies } = useQuery('all-companies', getAllUserCompanies, {
		enabled: !!isConnected,
	});

	console.log(companies);

	return (
		<AppLayout right={<CompaniesRightBar />}>
			<Flex direction="column" pt="6" w="100%">
				<Flex direction="column">
					<DashboardHeader />
					<CompaniesDashboard
						members={17}
						companiesCount={companies?.length}
						teams={1}
						totalFunds={67900}
					/>
				</Flex>
				<Flex w="full" flexDir="column" gap="8">
					{companies?.length ? (
						<CompaniesListFixed companies={companies} />
					) : (
						<Flex direction="column" gap="4" pt="10">
							<Text
								fontSize="md"
								fontWeight="medium"
								color={theme.text.primary}
							>
								{translate('yourCompanies')}
							</Text>
							<CreateCompanyCard />
						</Flex>
					)}
					<RecentActivities />
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default CompaniesConnected;

import { Flex, Text } from '@chakra-ui/react';
import {
	DashboardHeader,
	CreateCompanyCard,
	RecentActivities,
	CompaniesDashboard,
	CompaniesRightBar,
	CompaniesList,
} from 'components';
import { AppLayout } from 'layouts';
import { useCompanies, usePicasso } from 'hooks';
import { useQuery } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

export const CompaniesConnected: React.FC = () => {
	const { activities, getAllUserCompanies } = useCompanies();
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');

	const {
		data: companies,
		isLoading: isLoadingCompanies,
		error,
	} = useQuery('all-companies', getAllUserCompanies);

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
				<Flex w="full" flexDir="column" gap="8" pt="10">
					{companies?.length ? (
						<CompaniesList
							companies={companies}
							isLoading={isLoadingCompanies}
						/>
					) : (
						<Flex direction="column" gap="4">
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
					{activities && <RecentActivities />}
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default CompaniesConnected;

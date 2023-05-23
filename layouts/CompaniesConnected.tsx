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
import { useAccount, useContractRead } from 'wagmi';
import useTranslation from 'next-translate/useTranslation';
import companyAbi from 'utils/abi/company.json';

export const CompaniesConnected: React.FC = () => {
	const { activities, getAllUserCompanies } = useCompanies();
	const { isConnected } = useAccount();
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();

	const { data: companies } = useQuery('all-companies', getAllUserCompanies, {
		enabled: !!isConnected,
	});

	// const { data } = useContractRead({
	// 	address: '0x1C7E61bF4754Ffd0def0EAd225a8fbDa4a6Eb9D4',
	// 	abi: companyAbi,
	// 	functionName: '_CompanyOwner',
	// });

	// console.log(data);

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
					{activities && <RecentActivities />}
				</Flex>
			</Flex>
		</AppLayout>
	);
};

export default CompaniesConnected;

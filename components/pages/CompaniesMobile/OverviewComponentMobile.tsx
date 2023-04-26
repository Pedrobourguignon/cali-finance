import { Flex } from '@chakra-ui/react';
import {
	CompaniesHeaderMobile,
	EmployeesDashboard,
	RecentActivities,
	WithdrawsBarMobile,
} from 'components';
import { useCompanies } from 'hooks';

export const OverviewComponentMobile = () => {
	const { selectedCompany } = useCompanies();

	return (
		<Flex direction="column">
			<Flex color="black" direction="column" align="start">
				<CompaniesHeaderMobile />
			</Flex>
			<Flex w="full">
				<WithdrawsBarMobile />
			</Flex>
			<Flex py="6" direction="column" gap="9">
				<Flex pt="6">
					<EmployeesDashboard
						isGeneral={false}
						selectedCompany={selectedCompany}
					/>
				</Flex>
				<Flex pb="14">
					<RecentActivities />
				</Flex>
			</Flex>
		</Flex>
	);
};

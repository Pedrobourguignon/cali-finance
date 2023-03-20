import { Flex } from '@chakra-ui/react';
import {
	CompaniesHeader,
	EmployeesDashboard,
	RecentActivities,
} from 'components';
import { useCompanies } from 'hooks';

export const OverviewComponent = () => {
	const { selectedCompany } = useCompanies();

	return (
		<Flex direction="column">
			<Flex w="100%" bg="white" position="absolute" h="14.4rem" left="0" />
			<Flex
				color="black"
				pt="6"
				zIndex="docked"
				direction="column"
				align="start"
			>
				<CompaniesHeader />
			</Flex>
			<Flex py="6" direction="column" gap="9">
				<Flex pt="6">
					<EmployeesDashboard
						isGeneral={false}
						selectedCompany={selectedCompany}
					/>
				</Flex>
				<RecentActivities />
			</Flex>
		</Flex>
	);
};

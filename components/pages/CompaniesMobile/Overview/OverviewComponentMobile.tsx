import { Flex } from '@chakra-ui/react';
import {
	CompaniesHeaderMobile,
	EmployeesDashboard,
	RecentActivities,
} from 'components';

export const OverviewComponentMobile = () => (
	<Flex direction="column">
		<Flex color="black" direction="column" align="start">
			<CompaniesHeaderMobile />
		</Flex>

		<Flex py="6" direction="column" gap="9">
			<Flex pt="6">
				<EmployeesDashboard isGeneral={false} />
			</Flex>
			<Flex pb="14">
				<RecentActivities />
			</Flex>
		</Flex>
	</Flex>
);

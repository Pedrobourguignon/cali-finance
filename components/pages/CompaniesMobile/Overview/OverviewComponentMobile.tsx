import { Flex } from '@chakra-ui/react';
import {
	CompaniesHeaderMobile,
	EmployeesDashboard,
	RecentActivities,
	WithdrawsBarMobile,
} from 'components';
import { CompaniesProvider } from 'contexts';

export const OverviewComponentMobile = () => (
	<CompaniesProvider>
		<Flex direction="column">
			<Flex color="black" direction="column" align="start">
				<CompaniesHeaderMobile />
			</Flex>
			<Flex w="full">
				<WithdrawsBarMobile />
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
	</CompaniesProvider>
);

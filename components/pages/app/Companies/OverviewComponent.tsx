import { Flex } from '@chakra-ui/react';
import {
	CompaniesHeader,
	EmployeesDashboard,
	RecentActivities,
} from 'components';
import { TokensProvider } from 'contexts';
import { useCompanies } from 'hooks';

export const OverviewComponent = () => (
	<TokensProvider>
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
					<EmployeesDashboard isGeneral={false} />
				</Flex>
				<RecentActivities />
			</Flex>
		</Flex>
	</TokensProvider>
);

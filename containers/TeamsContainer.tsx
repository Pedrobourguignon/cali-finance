import { Flex } from '@chakra-ui/react';
import { TeamTable, TeamFinanceOverall } from 'components';

import { AppLayout } from 'layouts';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<Flex>
				<TeamTable />
			</Flex>
			<Flex>
				<TeamFinanceOverall />
			</Flex>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

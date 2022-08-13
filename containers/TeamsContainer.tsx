import { Flex } from '@chakra-ui/react';
import { TeamTable, TeamOverall } from 'components';

import { AppLayout } from 'layouts';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<Flex>
				<TeamTable />
				<TeamOverall />
			</Flex>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

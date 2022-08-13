import { Flex } from '@chakra-ui/react';
import { TeamOverall, TeamTable } from 'components';

import { AppLayout } from 'layouts';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<Flex gap="32">
				<TeamTable />
				<TeamOverall />
			</Flex>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

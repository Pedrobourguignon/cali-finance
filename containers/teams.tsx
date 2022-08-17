import { Flex } from '@chakra-ui/react';
import { TeamOverall, TeamTable } from 'components';

import { AppLayout } from 'layouts';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<Flex
				gap="32"
				flexDirection={{
					base: 'column',
					sm: 'column',
					md: 'column',
					xl: 'row',
				}}
			>
				<TeamTable />
				<TeamOverall />
			</Flex>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

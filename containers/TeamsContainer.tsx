import { Flex } from '@chakra-ui/react';
import { TeamTable } from 'components';
import { AppLayout } from 'layouts';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<TeamTable />
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

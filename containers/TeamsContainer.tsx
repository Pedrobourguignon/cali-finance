import { Flex } from '@chakra-ui/react';
import { TeamTable } from 'components';
import { AppLayout } from 'layouts';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<Flex>
				<TeamTable />
			</Flex>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

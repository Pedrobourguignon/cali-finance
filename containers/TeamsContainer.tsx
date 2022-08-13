import { Flex } from '@chakra-ui/react';
import { TeamFinanceOverallCard, TeamTable } from 'components';
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

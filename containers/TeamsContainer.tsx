import { Flex } from '@chakra-ui/react';
import { TeamTable, TeamFinanceOverall } from 'components';
import { AppLayout } from 'layouts';
import { MarginLeftContainer } from './MarginLeftContainer';
import { MarginTopContainer } from './MarginTopContainer';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<MarginTopContainer>
				<MarginLeftContainer>
					<Flex>
						<TeamTable />
					</Flex>
					<Flex>
						<TeamFinanceOverall />
					</Flex>
				</MarginLeftContainer>
			</MarginTopContainer>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

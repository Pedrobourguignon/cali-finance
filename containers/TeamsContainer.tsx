import { Flex } from '@chakra-ui/react';
import { TeamFinanceOverallCard, TeamTable } from 'components';
import { AppLayout } from 'layouts';
import { MarginLeftContainer } from './MarginLeftContainer';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<MarginLeftContainer>
				<Flex mt="36">
					<Flex>
						<TeamTable />
					</Flex>
					<Flex>
						<TeamFinanceOverallCard />
					</Flex>
				</Flex>
			</MarginLeftContainer>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

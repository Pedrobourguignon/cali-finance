import { Flex } from '@chakra-ui/react';
import { TeamTable } from 'components';
import { AppLayout } from 'layouts';
import { MarginLeftContainer } from './MarginLeftContainer';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<MarginLeftContainer>
				<Flex>
					<TeamTable />
				</Flex>
			</MarginLeftContainer>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;

import { Flex, Icon } from '@chakra-ui/react';
import { TeamComponent } from 'components';
import { TeamsProvider } from 'contexts';
import { AppLayout } from 'layouts';
import Link from 'next/link';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

export const TeamsContainer = () => (
	<TeamsProvider>
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
				<TeamComponent />
				<Flex
					w="48"
					display={{ base: 'flex', md: 'none' }}
					direction="row"
					justify="space-evenly"
				>
					<Link href="/">
						<Icon as={FaDiscord} boxSize="10" />
					</Link>
					<Link href="/">
						<Icon as={FaTwitter} boxSize="10" />
					</Link>
				</Flex>
			</Flex>
		</AppLayout>
	</TeamsProvider>
);

export default TeamsContainer;

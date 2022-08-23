import { Flex, Icon } from '@chakra-ui/react';
import { TeamOverall, TeamTable } from 'components';
import { AppLayout } from 'layouts';
import Link from 'next/link';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

export const TeamsContainer = () => (
	<AppLayout>
		<Flex
			flexDirection={{
				base: 'column',
				xl: 'row',
			}}
			align={{ base: 'center', md: 'flex-start' }}
			gap="20"
			mt="8"
			flexWrap="wrap"
		>
			<TeamTable />
			<TeamOverall />
			<Flex
				w="48"
				display={{ base: 'flex', md: 'none' }}
				direction="row"
				justify="space-evenly"
				mb="8"
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
);

export default TeamsContainer;

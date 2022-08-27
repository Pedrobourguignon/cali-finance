import { Flex, Icon } from '@chakra-ui/react';
import { TeamOverall, TeamTable } from 'components';
import { TeamsProvider } from 'contexts';
import { useTeams } from 'hooks';
import { AppLayout } from 'layouts';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { ITeamsData } from 'types';

export const TeamsContainer = () => {
	const [selectedTeam, setSelectedTeam] = useState<ITeamsData>();
	const { teams } = useTeams();

	useEffect(() => {
		if (teams.length > 0) setSelectedTeam(teams[0]);
	}, [teams]);

	return (
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
					<TeamTable />
					{selectedTeam && <TeamOverall selectedTeam={selectedTeam} />}
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
};

export default TeamsContainer;

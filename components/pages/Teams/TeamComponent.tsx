import { Flex } from '@chakra-ui/react';
import { useTeams } from 'hooks';
import { FC, useState } from 'react';
import { ITeamsData } from 'types';
import { TeamOverall, TeamTable } from '.';

export const TeamComponent: FC = () => {
	const { teams } = useTeams();
	const [selectedTeam, setSelectedTeam] = useState<ITeamsData>(teams[0]);

	const userHaveTeams = teams.length > 0;
	return userHaveTeams ? (
		<>
			<TeamTable selectedTeam={selectedTeam} />
			<TeamOverall selectedTeam={selectedTeam} />
		</>
	) : (
		<Flex>A</Flex>
	);
};

import { Button, Flex, Icon } from '@chakra-ui/react';
import { AiOutlineRight } from 'react-icons/ai';
import React from 'react';
import { TeamCard } from './Cards';

const teamList = [
	{
		teamName: 'Bar do Zé',
		funds: '$2,234.05',
		members: 2,
	},
	{
		teamName: 'Cabeleleila Leia',
		funds: '$92,234,11',
		members: 170,
	},
	{
		teamName: 'Sobrancheila Design',
		funds: '$5,234.1',
		members: 13,
	},
];

export const TeamsList = () => (
	<Flex gap="4" align="center">
		{teamList.map((team, index) => (
			<TeamCard
				key={+index}
				teamName={team.teamName}
				funds={team.funds}
				members={team.members}
			/>
		))}
	</Flex>
);

export default TeamsList;

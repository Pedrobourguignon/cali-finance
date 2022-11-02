import { Flex } from '@chakra-ui/react';
import React from 'react';
import { ITeamsList } from 'types';
import { OrganizationCard } from 'components';

const organizationsList: ITeamsList[] = [
	{
		logo: '',
		teamName: 'Bar do Zé',
		funds: '$2,234.05',
		members: 2,
	},
	{
		logo: '',
		teamName: 'Cabeleleila Leia',
		funds: '$92,234,11',
		members: 170,
	},
	{
		logo: '',
		teamName: 'Sobrancheila Design',
		funds: '$5,234.1',
		members: 13,
	},
];

export const OrganizationsList = () => (
	<Flex gap="4" align="center">
		{organizationsList.map((team, index) => (
			<OrganizationCard
				logo={team.logo}
				key={+index}
				name={team.teamName}
				funds={+team.funds}
				members={team.members}
			/>
		))}
	</Flex>
);

export default OrganizationsList;

import { Flex } from '@chakra-ui/react';
import React from 'react';
import { OrganizationCard } from 'components';
import { useOrganizations } from 'hooks';

export const OrganizationsList = () => {
	const { organization } = useOrganizations();
	console.log(organization);
	return (
		<Flex gap="4" align="center">
			{organization.map((team, index) => (
				<OrganizationCard
					key={+index}
					logo={team.logo}
					name={team.name}
					funds={team.funds}
					members={team.members}
				/>
			))}
		</Flex>
	);
};

export default OrganizationsList;

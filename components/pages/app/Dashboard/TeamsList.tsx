import { Flex } from '@chakra-ui/react';
import React from 'react';
import { OrganizationCard } from 'components';
import { useOrganizations } from 'hooks';

export const OrganizationsList = () => {
	const { organizations } = useOrganizations();
	return (
		<Flex gap="4" align="center" w="full" flexWrap="wrap">
			{organizations.map((team, index) => (
				<OrganizationCard key={+index} team={team} />
			))}
		</Flex>
	);
};

export default OrganizationsList;

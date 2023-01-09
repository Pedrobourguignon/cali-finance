import { Flex, Text } from '@chakra-ui/react';
import { OrganizationCard } from 'components';
import { useOrganizations } from 'hooks';

export const YourOrganizations = () => {
	const { organizations } = useOrganizations();
	return (
		<Flex direction="column" gap="4" w="full">
			<Text color="black" fontSize="md" fontWeight="medium">
				Your Organizations
			</Text>
			<Flex gap="4" w="full">
				{organizations.map((team, index) => (
					<OrganizationCard key={+index} team={team} />
				))}
			</Flex>
		</Flex>
	);
};

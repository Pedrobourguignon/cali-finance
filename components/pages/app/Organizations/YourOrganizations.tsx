import { Flex, Text } from '@chakra-ui/react';
import { OrganizationCard } from 'components';
import { useOrganizations, usePicasso } from 'hooks';

export const YourOrganizations = () => {
	const { organizations } = useOrganizations();
	const theme = usePicasso();
	return (
		<Flex direction="column" gap={{ md: '1', lg: '2', xl: '4' }} w="full">
			<Text
				color={theme.text.primary}
				fontSize={{ md: 'sm', xl: 'md' }}
				fontWeight="medium"
			>
				Your Organizations
			</Text>
			<Flex gap={{ md: '4', '2xl': '6' }} w="full">
				{organizations.map((team, index) => (
					<OrganizationCard key={+index} team={team} />
				))}
			</Flex>
		</Flex>
	);
};

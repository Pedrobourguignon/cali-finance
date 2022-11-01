import { Flex, Text } from '@chakra-ui/react';
import { OrganizationCard } from 'components';
import { useOrganizations } from 'hooks';

export const YourOrganizations = () => {
	const { organization } = useOrganizations();
	return (
		<Flex direction="column" gap="4">
			<Text color="black" fontSize="md" fontWeight="medium">
				Your Organizations
			</Text>
			<Flex gap="4">
				{organization.map((item, index) => (
					<OrganizationCard
						key={index}
						logo={item.logo}
						name={item.name}
						funds={item.funds}
						members={item.members}
					/>
				))}
			</Flex>
		</Flex>
	);
};

import { Flex, Text } from '@chakra-ui/react';
import { OrganizationCard } from 'components';
import { IOrganization } from 'types';

interface IYourOrganizations {
	organization: IOrganization[];
}
export const YourOrganizations: React.FC<IYourOrganizations> = ({
	organization,
}) => (
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

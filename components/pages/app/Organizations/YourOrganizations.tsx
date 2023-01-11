import { Flex, Text } from '@chakra-ui/react';
import { OrganizationCard } from 'components';
import { useOrganizations } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const YourOrganizations = () => {
	const { organizations } = useOrganizations();
	const { t: translate } = useTranslation('organizations');

	return (
		<Flex direction="column" gap="4" w="full">
			<Text color="black" fontSize="md" fontWeight="medium">
				{translate('yourOrganizations')}
			</Text>
			<Flex gap="4" w="full">
				{organizations.map((team, index) => (
					<OrganizationCard key={+index} team={team} />
				))}
			</Flex>
		</Flex>
	);
};

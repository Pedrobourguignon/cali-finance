import { Flex, Text } from '@chakra-ui/react';
import { CreateOrganizationButton } from 'components';

// eslint-disable-next-line id-length
export const OrganizationsDashboardNoConnected = () => (
	<Flex w="100%">
		<Flex gap="10" bg="black" py="6" px="4" borderRadius="base">
			<Flex direction="column">
				<Text fontSize="xl" fontWeight="medium">
					-
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Organizations
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="xl" fontWeight="medium">
					-
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Teams
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="xl" fontWeight="medium">
					-
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Members
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="xl" fontWeight="medium">
					-
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Total Funds
				</Text>
			</Flex>
			<CreateOrganizationButton />
		</Flex>
	</Flex>
);

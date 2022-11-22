import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import { usePicasso } from 'hooks';

// eslint-disable-next-line id-length
export const OrganizationsDashboardNoConnected = () => {
	const theme = usePicasso();
	return (
		<Flex w="100%">
			<Flex gap="10" bg={theme.bg.primary} py="6" px="4" borderRadius="base">
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
					<Text fontSize="sm" fontWeight="normal" minW="24">
						Total Funds
					</Text>
				</Flex>
				<OffsetButton name="Create Organization" route="organization/create" />
			</Flex>
		</Flex>
	);
};

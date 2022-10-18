import { Button, Flex, Text } from '@chakra-ui/react';

// eslint-disable-next-line id-length
export const NewOrganizationsDashboard = () => (
	<Flex bg="red">
		<Flex gap="10" bg="black" py="6" px="4" borderRadius="base">
			<Flex direction="column">
				<Text fontSize="xl" fontWeight="medium">
					0
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Organizations
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="xl" fontWeight="medium">
					0
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Teams
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="xl" fontWeight="medium">
					0
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Members
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="xl" fontWeight="medium">
					$0
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Total Funds
				</Text>
			</Flex>
			<Button
				px="3"
				py="1.5"
				bg="white"
				fontSize="sm"
				fontWeight="medium"
				color="black"
				borderRadius="base"
			>
				Create Organization
			</Button>
		</Flex>
	</Flex>
);

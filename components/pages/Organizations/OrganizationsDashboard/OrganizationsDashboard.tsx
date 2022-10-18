import { Button, Flex, Text } from '@chakra-ui/react';

interface IOrganizationsDashboard {
	organizations: string;
	teams: string;
	members: string;
	totalFunds: string;
}

export const OrganizationsDashboard = () => {
	const data = {
		organizations: '3',
		teams: '18',
		members: '185',
		totalFunds: '67,986.09',
	};
	return (
		<Flex bg="red">
			<Flex gap="10" bg="black" py="6" px="4" borderRadius="base">
				<Flex direction="column">
					<Text fontSize="xl" fontWeight="medium">
						{data.organizations}
					</Text>
					<Text fontSize="sm" fontWeight="normal">
						Organizations
					</Text>
				</Flex>
				<Flex direction="column">
					<Text fontSize="xl" fontWeight="medium">
						{data.teams}
					</Text>
					<Text fontSize="sm" fontWeight="normal">
						Teams
					</Text>
				</Flex>
				<Flex direction="column">
					<Text fontSize="xl" fontWeight="medium">
						{data.members}
					</Text>
					<Text fontSize="sm" fontWeight="normal">
						Members
					</Text>
				</Flex>
				<Flex direction="column">
					<Text fontSize="xl" fontWeight="medium">
						${data.totalFunds}
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
};

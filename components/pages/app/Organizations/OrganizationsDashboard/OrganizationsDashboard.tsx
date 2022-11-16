import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import { usePicasso } from 'hooks';

interface IOrganizationsDashboard {
	organizationsCount: number;
	teams: string;
	members: string;
	totalFunds: string;
}

export const OrganizationsDashboard: React.FC<IOrganizationsDashboard> = ({
	members,
	organizationsCount,
	teams,
	totalFunds,
}) => {
	const theme = usePicasso();
	return (
		<Flex
			gap="12"
			bg={theme.bg.primary}
			py="6"
			px="5"
			borderRadius="base"
			align="center"
		>
			<Flex direction="column">
				<Text fontSize="2xl" fontWeight="medium">
					{organizationsCount}
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Organizations
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="2xl" fontWeight="medium">
					{teams}
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Teams
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="2xl" fontWeight="medium">
					{members}
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Members
				</Text>
			</Flex>
			<Flex direction="column">
				<Text fontSize="2xl" fontWeight="medium" minW="24">
					${totalFunds}
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Total Funds
				</Text>
			</Flex>
			<OffsetButton name="Create Organization" route="organizations/create" />
		</Flex>
	);
};

import { Flex, Text } from '@chakra-ui/react';
import { CreateOrganizationButton } from 'components';
import { usePicasso } from 'hooks';

interface IOrganizationsDashboard {
	organizations: string;
	teams: string;
	members: string;
	totalFunds: string;
}

export const OrganizationsDashboard: React.FC<IOrganizationsDashboard> = ({
	members,
	organizations,
	teams,
	totalFunds,
}) => {
	const theme = usePicasso();
	return (
		<Flex>
			<Flex gap="12" bg={theme.bg.primary} py="6" px="5" borderRadius="base">
				<Flex direction="column">
					<Text fontSize="xl" fontWeight="medium">
						{organizations}
					</Text>
					<Text fontSize="sm" fontWeight="normal">
						Organizations
					</Text>
				</Flex>
				<Flex direction="column">
					<Text fontSize="xl" fontWeight="medium">
						{teams}
					</Text>
					<Text fontSize="sm" fontWeight="normal">
						Teams
					</Text>
				</Flex>
				<Flex direction="column">
					<Text fontSize="xl" fontWeight="medium">
						{members}
					</Text>
					<Text fontSize="sm" fontWeight="normal">
						Members
					</Text>
				</Flex>
				<Flex direction="column">
					<Text fontSize="xl" fontWeight="medium" minW="24">
						${totalFunds}
					</Text>
					<Text fontSize="sm" fontWeight="normal">
						Total Funds
					</Text>
				</Flex>
				<CreateOrganizationButton />
			</Flex>
		</Flex>
	);
};

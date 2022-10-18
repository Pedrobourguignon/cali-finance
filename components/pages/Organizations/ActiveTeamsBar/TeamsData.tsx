import { Flex, Text } from '@chakra-ui/react';

interface ITeamsData {
	name: string;
	percentage: number;
	color: string;
}
export const TeamsData: React.FC<ITeamsData> = ({
	name,
	percentage,
	color,
}) => (
	<Flex direction="column">
		<Flex align="center" gap="1">
			<Flex width="1.5" h="1.5" rounded="full" bg={color} />
			<Text color="black" fontSize="xs">
				{name}
			</Text>
		</Flex>
		<Text color="black" fontSize="sm" fontWeight="medium">
			{percentage}%
		</Text>
	</Flex>
);

import { Flex, Img, Text } from '@chakra-ui/react';

interface IActivities {
	name: string;
	type: string;
	date: string;
	value: string;
	coin: string;
	status: string;
}

export const ActivitiesData: React.FC<IActivities> = ({
	name,
	type,
	date,
	value,
	coin,
	status,
}) => (
	<Flex align="center" px="5" py="3" bg="gray.50" borderRadius="base" gap="32">
		<Text fontSize="sm" fontWeight="normal" w="36">
			{name}
		</Text>
		<Flex align="center" gap="2">
			<Img src="/images/deposit.svg" boxSize="4" />
			<Flex direction="column">
				<Text fontSize="sm" fontWeight="normal">
					{type}
				</Text>
				<Text color="gray.500" fontSize="xs" w="24">
					{date}
				</Text>
			</Flex>
		</Flex>
		<Flex direction="column">
			<Text fontSize="sm" fontWeight="normal">
				{value}
				{coin}
			</Text>
			<Text
				fontSize="xs"
				color={
					// eslint-disable-next-line no-nested-ternary
					status === 'Completed'
						? 'green.400'
						: status === 'Processing'
						? 'gray.400'
						: 'red.400'
				}
			>
				{status}
			</Text>
		</Flex>
	</Flex>
);

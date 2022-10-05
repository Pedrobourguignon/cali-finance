import { Flex, Img, Text } from '@chakra-ui/react';

export const ActivitiesData = () => {
	const activities = {
		name: 'Kylie Cosmetics',
		type: 'Deposit',
		date: '08 Aug 22, 20:57',
		value: '10,000',
		coin: 'USDT',
		status: 'Completed',
	};
	return (
		<Flex>
			<Flex
				gap="44"
				align="center"
				px="3"
				py="3"
				bg="gray.50"
				borderRadius="base"
			>
				<Text fontSize="sm" fontWeight="normal">
					{activities.name}
				</Text>
				<Flex align="center" gap="2">
					<Img src="/images/deposit.png" boxSize="4" />
					<Flex direction="column">
						<Text fontSize="sm" fontWeight="normal">
							{activities.type}
						</Text>
						<Text color="gray.500" fontSize="xs">
							{activities.date}
						</Text>
					</Flex>
				</Flex>
				<Flex direction="column">
					<Text fontSize="sm" fontWeight="normal">
						{activities.value}
						{activities.coin}
					</Text>
					<Text
						fontSize="xs"
						color={
							// eslint-disable-next-line no-nested-ternary
							activities.status === 'Completed'
								? 'green.400'
								: activities.status === 'Processing'
								? 'gray.400'
								: 'red.400'
						}
					>
						{activities.status}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

import { Button, Flex, Text } from '@chakra-ui/react';
import { CircularProgressBar } from 'components';

const withdrawnPercentage = 50;
export const WithdrawsBar = () => (
	<Flex direction="column" position="relative">
		<Flex
			w="100%"
			px="4"
			py="2.5"
			bg="white"
			borderRadius="base"
			h="100%"
			direction="column"
			gap="3"
		>
			<Text color="black" fontWeight="medium" fontSize="md">
				Withdrawals
			</Text>
			<CircularProgressBar percentage={withdrawnPercentage} />
			<Flex zIndex="docked">
				<Button color="black" bgColor="gray.100" borderRadius="full">
					This Week
				</Button>
				<Button color="black">This Month</Button>
			</Flex>
		</Flex>
		<Flex
			h="100%"
			w="100%"
			justify="center"
			color="black"
			direction="column"
			textAlign="center"
			position="absolute"
		>
			<Text fontSize="xs">Withdrawn</Text>
			<Text fontWeight="medium">{withdrawnPercentage}%</Text>
		</Flex>
	</Flex>
);

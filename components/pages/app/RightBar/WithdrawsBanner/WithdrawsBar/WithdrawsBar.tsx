import { Button, Flex, Text } from '@chakra-ui/react';
import { CircularProgressBar } from 'components/ProgressBar/CircularProgressBar';
import { usePicasso } from 'hooks';

const withdrawnPercentage = 50;
export const WithdrawsBar = () => {
	const theme = usePicasso();
	return (
		<Flex
			direction="column"
			w="100%"
			px="4"
			py="2.5"
			bg="white"
			borderRadius="base"
			position="relative"
		>
			<Text color="black" fontWeight="medium" fontSize="md">
				Withdrawals
			</Text>
			<CircularProgressBar percentage={withdrawnPercentage} />
			<Flex
				color="black"
				direction="column"
				textAlign="center"
				position="absolute"
				left="38%"
				top="45%"
			>
				<Text fontSize="xs">Withdrawn</Text>
				<Text fontWeight="medium">{withdrawnPercentage}%</Text>
			</Flex>
			<Flex>
				<Button color="black"> This Week</Button>
				<Button color="black">This Month</Button>
			</Flex>
		</Flex>
	);
};

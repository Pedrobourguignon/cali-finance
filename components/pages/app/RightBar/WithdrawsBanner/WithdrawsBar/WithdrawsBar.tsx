import { Button, Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

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
		>
			<Text color="black">Withdrawals</Text>
			<Flex>
				<Button color="black"> This Week</Button>
				<Button color="black">This Month</Button>
			</Flex>
		</Flex>
	);
};

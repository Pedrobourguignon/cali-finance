import { Flex } from '@chakra-ui/react';
import { HaveProblemCard, SwapToken } from '../../Dashboard';

export const SwapTokenBar = () => (
	<Flex direction="column" gap="4" w="74" bg="white" py="6" px="6">
		<SwapToken />
		<HaveProblemCard />
	</Flex>
);

import { Flex } from '@chakra-ui/react';
import { HaveProblemCard, SwapToken } from 'components';

export const SwapTokenBar = () => (
	<Flex direction="column" gap="4" w="74">
		<SwapToken />
		<HaveProblemCard />
	</Flex>
);

import { Flex } from '@chakra-ui/react';
import { HaveProblemCard } from 'components';

export const SwapTokenBar = () => (
	<Flex
		direction="column"
		w={{ md: '40', lg: '56', xl: '18.5rem', '2xl': '23rem' }}
	>
		<HaveProblemCard />
	</Flex>
);

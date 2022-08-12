import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';

export const CoinsCardsStatic = () => {
	const theme = usePicasso();
	return (
		<Flex
			w="56"
			h="24"
			bg={theme.bg.primary}
			direction="column"
			rounded="lg"
			pl="4"
			justify="center"
		>
			<Text fontSize="xl">Coins</Text>
			<Text fontSize="sm">Stay always tuned on principal coin prices</Text>
		</Flex>
	);
};
export default CoinsCardsStatic;

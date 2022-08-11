import { Flex, Text } from '@chakra-ui/react'
import { usePicasso } from 'hooks/usePicasso'

export const CoinsCardsStatic = () => {
	const theme = usePicasso()
	return (
		<Flex
			w="56"
			h="24"
			p="2"
			bg={theme.bg.primary}
			direction="column"
			rounded="lg"
		>
			<Text fontSize="xl">Coins</Text>
			<Text fontSize="sm">Stay always tuned on principal coin prices</Text>
		</Flex>
	)
}

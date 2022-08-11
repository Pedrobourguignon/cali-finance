import { Flex, Icon, Img, Text } from '@chakra-ui/react'
import { usePicasso } from 'hooks/usePicasso'
import { BsPlusSquare } from 'react-icons/bs'

export const NewCoinCard = () => {
	const theme = usePicasso()
	return (
		<Flex
			w="56"
			h="24"
			px="4"
			bg={theme.bg.primary}
			rounded="lg"
			align="center"
		>
			<Icon as={BsPlusSquare} boxSize="10" mr="4" />
			<Text>Add a new coin...</Text>
		</Flex>
	)
}

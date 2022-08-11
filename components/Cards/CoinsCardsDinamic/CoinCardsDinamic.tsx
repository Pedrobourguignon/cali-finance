import { Flex, Img, Text } from '@chakra-ui/react'
import { usePicasso } from 'hooks/usePicasso'

export const CoinsCardsDinamic = () => {
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
			<Img src="/images/cali-logo.svg" w="12" h="12" />
			<Flex justify="space-between" ml="4" w="48">
				<Flex direction="column">
					<Text fontSize="md" mb="3">
						USDT
					</Text>
					<Text fontSize="sm" color={theme.text.green}>
						+0,6 %
					</Text>
				</Flex>
				<Flex direction="column">
					<Text fontSize="sm" mb="3" color={theme.text.gray}>
						R$ 1,00
					</Text>
					<Img src="/images/cali-logo.svg" w="12" h="5" />
				</Flex>
			</Flex>
		</Flex>
	)
}

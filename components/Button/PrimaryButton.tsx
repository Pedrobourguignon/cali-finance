import { Button, Flex } from '@chakra-ui/react'

export const PrimaryButton = () => {
	return (
		<Flex boxShadow="0px 0px 10px rgba(232, 49, 81, 0.5)" mt="16">
			<Flex
				mt="1"
				ml="1"
				w="2xs"
				h="16"
				borderColor="red.600"
				borderBottomWidth="0.25rem"
				borderBottomStyle="solid"
				borderRightWidth="0.25rem"
				borderRightStyle="solid"
				position="absolute"
			/>
			<Button
				borderRadius="none"
				w="2xs"
				h="16"
				variant="outline"
				borderColor="red.600"
				fontSize="3xl"
			>
				Open app
			</Button>
		</Flex>
	)
}

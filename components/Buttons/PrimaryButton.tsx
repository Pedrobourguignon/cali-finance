import { Button, Flex } from '@chakra-ui/react'
import { usePicasso } from 'hooks/usePicasso'

export const PrimaryButton = () => {
	const theme = usePicasso()
	return (
		<Flex boxShadow={theme.shadow.red} mt="16">
			<Flex
				mt="1"
				ml="1"
				w="2xs"
				h="16"
				borderColor={theme.branding.red}
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
				borderColor={theme.branding.red}
				fontSize="3xl"
			>
				Open app
			</Button>
		</Flex>
	)
}

export default PrimaryButton

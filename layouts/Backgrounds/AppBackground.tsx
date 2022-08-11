import { Flex } from '@chakra-ui/react'
import { LandingPageHeader } from 'components/Header/LandingPageHeader'
import { usePicasso } from 'hooks/usePicasso'
import { IBackground } from 'types'

export const AppBackground: React.FC<IBackground> = ({ children }) => {
	const theme = usePicasso()
	return (
		<Flex direction="column" w="full" background={theme.bg.secondary}>
			<LandingPageHeader />

			{children}
		</Flex>
	)
}

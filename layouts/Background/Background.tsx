import { Flex } from '@chakra-ui/react'
import { Header } from 'components/Header/Header'
import { usePicasso } from 'hooks/usePicasso'

interface IBackground {
	children: React.ReactNode
}

export const Background: React.FC<IBackground> = ({ children }) => {
	const theme = usePicasso()
	return (
		<Flex direction="column" w="full" background={theme.bg.gradient}>
			<Header />
			{children}
		</Flex>
	)
}

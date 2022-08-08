import { Flex } from '@chakra-ui/react'
import { Header } from 'components/Header/Header'

interface IBackground {
	children: React.ReactNode
}

export const Background: React.FC<IBackground> = ({ children }) => {
	return (
		<Flex
			direction="column"
			h="100vh"
			background="linear-gradient(112.87deg, rgba(26, 29, 225, 0.1) 0%, rgba(16, 15, 18, 0.1) 32.29%, rgba(16, 15, 18, 0.1) 66.15%, rgba(2, 228, 209, 0.1) 100%);"
		>
			<Header />
			{children}
		</Flex>
	)
}

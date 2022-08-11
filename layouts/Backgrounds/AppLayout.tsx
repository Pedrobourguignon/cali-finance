import { Flex } from '@chakra-ui/react'
import AppHeader from 'components/Header/AppHeader/AppHeader'
import Sidebar from 'components/SideBar/Sidebar'
import { usePicasso } from 'hooks/usePicasso'
import { IBackground } from 'types'

export const AppLayout: React.FC<IBackground> = ({ children }) => {
	const theme = usePicasso()
	return (
		<Flex
			direction="column"
			w="full"
			background={theme.bg.secondary}
			minHeight="100vh"
		>
			<Flex as="header">
				<AppHeader />
			</Flex>
			<Flex position="fixed">
				<Sidebar />
			</Flex>
			<Flex pl="24">{children}</Flex>
		</Flex>
	)
}

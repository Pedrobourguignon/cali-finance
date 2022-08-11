import { Flex, Icon, Text } from '@chakra-ui/react'
import { PrimaryButton } from 'components/Button/PrimaryButton'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import NextLink from 'next/link'
import type { NextPage } from 'next'
import { usePicasso } from '../hooks/usePicasso'
import Sidebar from 'components/SideBar/Sidebar'
import AppHeader from 'components/AppHeader/AppHeader'
import TeamsContainer from 'container/TeamsContainer/TeamsContainer'

const Teams = () => {
	return (
		<Flex minH="100vh" minW="100vw" direction="column" bg="black">
			<Flex>
				<Flex>
					<Sidebar />
				</Flex>
				<Flex>
					<AppHeader />
				</Flex>
				<TeamsContainer />
			</Flex>
		</Flex>
	)
}

export default Teams

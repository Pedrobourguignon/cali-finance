import { Flex, Icon, Text } from '@chakra-ui/react'
import { PrimaryButton } from 'components/Button/PrimaryButton'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import NextLink from 'next/link'
import type { NextPage } from 'next'
import { usePicasso } from '../hooks/usePicasso'
import Sidebar from 'components/SideBar/Sidebar'

const Teams = () => {
	return (
		<Flex
			minH="100vh"
			minW="100vw"
			justify="center"
			direction="column"
			position="absolute"
			bg="black"
		>
			<Sidebar />
		</Flex>
	)
}

export default Teams

import {
	Button,
	Flex,
	Icon,
	Img,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Divider,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { RiTeamLine } from 'react-icons/ri'
import { AiOutlineAppstore } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'
import { BsArrowLeftRight } from 'react-icons/bs'
import { FaDiscord, FaTwitter } from 'react-icons/fa'

const Sidebar = () => {
	return (
		<Flex
			h="100vh"
			w="20"
			flexDirection="column"
			justifyContent="space-between"
		>
			<Flex ml="6" mt="6" alignItems="center">
				<NextLink href="/">
					<Img src="/images/cali-logo.svg" w="16" h="10" />
				</NextLink>
			</Flex>
			<Flex className="menu" flexDirection="column" mx="8" align="center">
				<Flex mt="8">
					<Icon as={AiOutlineAppstore} boxSize="6" color="gray.400" />
				</Flex>
				<Flex mt="8">
					<Icon as={RiTeamLine} boxSize="4" color="gray.400" />
				</Flex>
				<Flex mt="8">
					<Icon as={BsArrowLeftRight} boxSize="4" color="gray.400" />
				</Flex>
				<Flex mt="8">
					<Divider orientation="horizontal" />
				</Flex>
				<Flex mt="8">
					<Icon as={IoLogOutOutline} boxSize="4" color="gray.400" />
				</Flex>
			</Flex>
			<Flex flexDirection="column" alignItems="center">
				<Flex
					w="10"
					h="10"
					bg="whiteAlpha.50"
					borderRadius="full"
					justify="center"
					align="center"
					mb="6"
				>
					<Icon as={FaDiscord} boxSize="5" color="gray.400" />
				</Flex>
				<Flex
					w="10"
					h="10"
					bg="whiteAlpha.50"
					borderRadius="full"
					justify="center"
					align="center"
					mb="6"
				>
					<Icon as={FaTwitter} boxSize="5" color="gray.400" />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Sidebar

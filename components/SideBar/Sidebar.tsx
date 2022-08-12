import { Flex, Icon, Img, Divider } from '@chakra-ui/react'
import NextLink from 'next/link'
import { RiTeamLine } from 'react-icons/ri'
import { AiOutlineAppstore } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'
import { BsArrowLeftRight } from 'react-icons/bs'
import { FaDiscord, FaTwitter } from 'react-icons/fa'

const Sidebar: React.FC = () => {
	const menuOptions = [AiOutlineAppstore, RiTeamLine, BsArrowLeftRight]

	return (
		<Flex
			minH="100vh"
			w="20"
			flexDirection="column"
			justifyContent="space-between"
			alignItems="center"
		>
			<Flex w="full" flexDirection="column">
				<Flex ml="6" mt="8" mb="10" alignItems="center">
					<NextLink href="/">
						<Img src="/images/cali-logo.svg" w="16" h="10" />
					</NextLink>
				</Flex>
				<Flex className="menu" flexDirection="column" align="center" ml="6">
					{menuOptions.map(menuItem => (
						<Flex mt="8">
							<Icon as={menuItem} boxSize="5" color="gray.400" />
						</Flex>
					))}
					<Flex mt="8">
						<Divider orientation="horizontal" w="8" bg="gray.400" />
					</Flex>
					<Flex mt="8">
						<Icon as={IoLogOutOutline} boxSize="5" color="gray.400" />
					</Flex>
				</Flex>
			</Flex>

			<Flex flexDirection="column" alignItems="center" ml="6">
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

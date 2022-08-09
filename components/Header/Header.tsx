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
} from '@chakra-ui/react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import NextLink from 'next/link'
export const Header = () => {
	return (
		<Flex
			justify="space-between"
			px="12"
			w="100%"
			minH="20"
			align="center"
			position="absolute"
		>
			<Flex>
				<NextLink href="/">
					<Img src="/images/cali-logo-with-text.svg" w="32" h="8" />
				</NextLink>
			</Flex>
			<Flex
				w="sm"
				justify="space-between"
				display={{ base: 'none', lg: 'flex' }}
			>
				<NextLink href="/">
					<Link>Home</Link>
				</NextLink>
				<NextLink href="/">
					<Link>Roadmap</Link>
				</NextLink>
				<NextLink href="/">
					<Link>Docs</Link>
				</NextLink>
				<NextLink href="/">
					<Link>Contact</Link>
				</NextLink>
			</Flex>
			<Flex display={{ base: 'none', lg: 'flex' }}>
				<Flex
					w="10"
					h="10"
					bg="whiteAlpha.50"
					borderRadius="full"
					justify="center"
					align="center"
				>
					<NextLink href="/">
						<Icon as={FaDiscord} boxSize="6" />
					</NextLink>
				</Flex>
				<Flex
					ml="5"
					w="10"
					h="10"
					bg="whiteAlpha.50"
					borderRadius="full"
					justify="center"
					align="center"
				>
					<NextLink href="/">
						<Icon as={FaTwitter} boxSize="6" />
					</NextLink>
				</Flex>
			</Flex>
			<Flex display={{ base: 'flex', lg: 'none' }}>
				<Menu autoSelect={false} closeOnBlur={true}>
					{({ isOpen }) => (
						<>
							<MenuButton isActive={isOpen} as={Button}>
								{isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
							</MenuButton>
							<MenuList>
								<MenuItem>
									<NextLink href="/">
										<Link>Home</Link>
									</NextLink>
								</MenuItem>
								<MenuItem>
									<NextLink href="/">
										<Link>Roadmap</Link>
									</NextLink>
								</MenuItem>
								<MenuItem>
									<NextLink href="/">
										<Link>Docs</Link>
									</NextLink>
								</MenuItem>
								<MenuItem>
									<NextLink href="/">
										<Link>Contact</Link>
									</NextLink>
								</MenuItem>
							</MenuList>
						</>
					)}
				</Menu>
			</Flex>
		</Flex>
	)
}

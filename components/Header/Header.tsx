import { Flex, Icon, Img, Link } from '@chakra-ui/react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import NextLink from 'next/link'
export const Header = () => {
	return (
		<Flex justify="space-between" my="6" mx="12" align="center">
			<Flex>
				<NextLink href="/">
					<Img src="/images/cali-logo-with-text.svg" w="32" h="8" />
				</NextLink>
			</Flex>
			<Flex w="sm" justify="space-between">
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
			<Flex>
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
		</Flex>
	)
}

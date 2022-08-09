import { Flex, Icon } from '@chakra-ui/react'
import { PrimaryButton } from 'components/Button/PrimaryButton'
import { Background } from 'layouts/Background/Background'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import NextLink from 'next/link'
import type { NextPage } from 'next'

const Home: NextPage = () => {
	return (
		<Background>
			<Flex minH="100vh" justify="center" align="center" direction="column">
				<Flex
					w={{ base: '2xs', lg: '3xl' }}
					fontSize={{ base: '3xl', lg: '5xl' }}
					textAlign="center"
					mb={{ base: '8', lg: '3.5' }}
					lineHeight="normal"
				>
					A new meaning of “time is money.”
				</Flex>
				<Flex
					fontSize={{ base: 'md', lg: 'lg' }}
					w={{ base: '2xs', lg: 'lg' }}
					textAlign="center"
				>
					No need for wait your payday anymore. Meet the future of payroll
					immerse on blockchain.
				</Flex>
				<PrimaryButton />
			</Flex>
			<Flex display={{ base: 'flex', lg: 'none' }} mb="8" justify="center">
				<Flex>
					<NextLink href="/">
						<Icon as={FaDiscord} boxSize="10" />
					</NextLink>
				</Flex>
				<Flex ml="10">
					<NextLink href="/">
						<Icon as={FaTwitter} boxSize="10" />
					</NextLink>
				</Flex>
			</Flex>
		</Background>
	)
}

export default Home

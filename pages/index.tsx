import { Flex, Icon } from '@chakra-ui/react'
import { PrimaryButton } from 'components/Button/PrimaryButton'
import { Background } from 'layouts/Background/Background'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import NextLink from 'next/link'
import type { NextPage } from 'next'

const Home: NextPage = () => {
	return (
		<Background>
			<Flex h="full" justify="center" align="center" direction="column">
				<Flex fontSize="5xl" textAlign="center">
					A new meaning of “time is money.”
				</Flex>
				<Flex fontSize="lg" textAlign="center">
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

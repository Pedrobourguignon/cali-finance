import { Flex } from '@chakra-ui/react'
import { PrimaryButton } from 'components/Button/PrimaryButton'
import { Background } from 'layouts/Background/Background'
import type { NextPage } from 'next'

const Home: NextPage = () => {
	return (
		<Background>
			<Flex h="full" justify="center" align="center" direction="column">
				<Flex fontSize="5xl" textAlign="center">
					A new meaning of “time is money.”
				</Flex>
				<Flex fontSize="lg" w="md" textAlign="center">
					No need for wait your payday anymore. Meet the future of payroll
					immerse on blockchain.
				</Flex>
				<PrimaryButton />
			</Flex>
		</Background>
	)
}

export default Home

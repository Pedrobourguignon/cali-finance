import { Flex } from '@chakra-ui/react'
import { CoinsBox } from 'components/CoinsBox/CoinsBox'
import { AppBackground } from 'layouts'
import { NextPage } from 'next'

const Home: NextPage = () => {
	return (
		<AppBackground>
			<Flex minHeight="100vh">
				<Flex mt="40" ml="28">
					<CoinsBox />
				</Flex>
			</Flex>
		</AppBackground>
	)
}

export default Home

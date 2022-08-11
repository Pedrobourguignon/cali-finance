import { Flex } from '@chakra-ui/react'
import { CoinsBox } from 'components/CoinsBox/CoinsBox'
import { AppBackground } from 'layouts'

export const HomeContainer: React.FC = () => {
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

import { Flex } from '@chakra-ui/react'
import { CoinsCardsStatic, NewCoinCard } from 'components'
import { CoinsCardsDinamic } from 'components/Cards/CoinsCardsDinamic/CoinCardsDinamic'

import { AppLayout } from 'layouts'

export const HomeContainer: React.FC = () => {
	return (
		<AppLayout>
			<Flex bg="red">
				<Flex>
					<CoinsCardsStatic />
				</Flex>
				<Flex>
					<CoinsCardsDinamic />
				</Flex>
				<Flex>
					<NewCoinCard />
				</Flex>
			</Flex>
		</AppLayout>
	)
}

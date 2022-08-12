import { Flex } from '@chakra-ui/react'
import { CoinsCardsDinamic, CoinsCardsStatic, NewCoinCard } from 'components'
import { AppLayout } from 'layouts'

export const HomeContainer: React.FC = () => {
	return (
		<AppLayout>
			<Flex>
				<Flex>
					<CoinsCardsStatic />
				</Flex>
				<Flex>
					<Flex>
						<CoinsCardsDinamic />
					</Flex>
					<Flex>
						<CoinsCardsDinamic />
					</Flex>
				</Flex>
				<Flex>
					<NewCoinCard />
				</Flex>
			</Flex>
		</AppLayout>
	)
}

import { Flex } from '@chakra-ui/react';
import { CoinsCardsDinamic, CoinsCardsStatic, NewCoinCard } from 'components';
import { AppLayout } from 'layouts';
import { MarginLeftContainer } from './MarginLeftContainer';

export const HomeContainer: React.FC = () => (
	<AppLayout>
		<MarginLeftContainer>
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
		</MarginLeftContainer>
	</AppLayout>
);

import { Flex } from '@chakra-ui/react';
import {
	CoinsCardsDinamic,
	CoinsCardsStatic,
	MyAssetsTable,
	NewCoinCard,
} from 'components';

import { AppLayout } from 'layouts';
import { MarginLeftContainer } from './MarginLeftContainer';

export const HomeContainer: React.FC = () => (
	<AppLayout>
		<MarginLeftContainer>
			<Flex direction="column">
				<Flex mt="36">
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
				<Flex>
					<MyAssetsTable />
				</Flex>
			</Flex>
		</MarginLeftContainer>
	</AppLayout>
);

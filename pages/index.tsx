import { Flex } from '@chakra-ui/react';
import { NewLandingContainer, NewLandingMobileContainer } from 'containers';
import { TokensProvider } from 'contexts';
import type { NextPage } from 'next';

const Home: NextPage = () => (
	<TokensProvider>
		<Flex display={{ base: 'flex', sm: 'none' }}>
			<NewLandingMobileContainer />
		</Flex>
		<Flex display={{ base: 'none', sm: 'flex' }}>
			<NewLandingContainer />
		</Flex>
	</TokensProvider>
);

export default Home;

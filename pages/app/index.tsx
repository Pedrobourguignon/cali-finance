import { NewLandingContainer } from 'containers';
import { TokensProvider } from 'contexts';
import type { NextPage } from 'next';

const Home: NextPage = () => (
	<TokensProvider>
		<NewLandingContainer />
	</TokensProvider>
);

export default Home;

import { useMediaQuery } from '@chakra-ui/react';
import { NewLandingContainer, NewLandingMobileContainer } from 'containers';
import { TokensProvider } from 'contexts';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	const [isLargerThan480] = useMediaQuery('(min-width: 480px)', {
		fallback: true,
	});
	return (
		<TokensProvider>
			{isLargerThan480 ? (
				<NewLandingContainer />
			) : (
				<NewLandingMobileContainer />
			)}
		</TokensProvider>
	);
};

export default Home;

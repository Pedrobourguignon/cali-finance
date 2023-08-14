import { FundsPageComponent } from 'components';
import { TokensProvider } from 'contexts';

export const FundsContainer = () => (
	<TokensProvider>
		<FundsPageComponent />
	</TokensProvider>
);

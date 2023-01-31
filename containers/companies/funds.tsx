import { FundsPageComponent } from 'components';
import { CompaniesProvider, TokensProvider } from 'contexts';

export const FundsContainer = () => (
	<CompaniesProvider>
		<TokensProvider>
			<FundsPageComponent />
		</TokensProvider>
	</CompaniesProvider>
);

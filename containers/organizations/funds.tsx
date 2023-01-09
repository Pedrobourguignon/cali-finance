import { FundsPageComponent } from 'components';
import { OrganizationsProvider, TokensProvider } from 'contexts';

export const FundsContainer = () => (
	<OrganizationsProvider>
		<TokensProvider>
			<FundsPageComponent />
		</TokensProvider>
	</OrganizationsProvider>
);

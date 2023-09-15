import { FundsContainer, FundsContainerMobile } from 'containers';
import {
	AuthProvider,
	CompaniesProvider,
	ProfileProvider,
	TokensProvider,
} from 'contexts';

export const Funds = () => (
	<AuthProvider>
		<CompaniesProvider>
			<ProfileProvider>
				<TokensProvider>
					<FundsContainer />
					<FundsContainerMobile />
				</TokensProvider>
			</ProfileProvider>
		</CompaniesProvider>
	</AuthProvider>
);

export default Funds;

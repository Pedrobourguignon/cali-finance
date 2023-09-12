import { FundsContainer, FundsContainerMobile } from 'containers';
import { AuthProvider, CompaniesProvider } from 'contexts';

export const Funds = () => (
	<AuthProvider>
		<CompaniesProvider>
			<FundsContainer />
			<FundsContainerMobile />
		</CompaniesProvider>
	</AuthProvider>
);

export default Funds;

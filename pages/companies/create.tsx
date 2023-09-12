import {
	CreateCompanyContainer,
	CreateCompanyMobileContainer,
} from 'containers';
import { AuthProvider, CompaniesProvider } from 'contexts';

export const CreateCompany = () => (
	<AuthProvider>
		<CompaniesProvider>
			<CreateCompanyContainer />
		</CompaniesProvider>
		<CompaniesProvider>
			<CreateCompanyMobileContainer />
		</CompaniesProvider>
	</AuthProvider>
);
export default CreateCompany;

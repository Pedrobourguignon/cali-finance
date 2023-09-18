import {
	CreateCompanyContainer,
	CreateCompanyMobileContainer,
} from 'containers';
import { AuthProvider, CompaniesProvider, ProfileProvider } from 'contexts';

export const CreateCompany = () => (
	<AuthProvider>
		<CompaniesProvider>
			<ProfileProvider>
				<CreateCompanyContainer />
				<CreateCompanyMobileContainer />
			</ProfileProvider>
		</CompaniesProvider>
	</AuthProvider>
);
export default CreateCompany;

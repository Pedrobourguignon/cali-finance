import {
	CreateCompanyContainer,
	CreateCompanyMobileContainer,
} from 'containers';
import { CompaniesProvider } from 'contexts';

export const CreateCompany = () => (
	<>
		<CompaniesProvider>
			<CreateCompanyContainer />
		</CompaniesProvider>
		<CompaniesProvider>
			<CreateCompanyMobileContainer />
		</CompaniesProvider>
	</>
);
export default CreateCompany;

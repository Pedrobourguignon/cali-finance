import { CreateCompanyContainer } from 'containers';
import { CompaniesProvider } from 'contexts';

export const CreateCompany = () => (
	<CompaniesProvider>
		<CreateCompanyContainer />
	</CompaniesProvider>
);
export default CreateCompany;

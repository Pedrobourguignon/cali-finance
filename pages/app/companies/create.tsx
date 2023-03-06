import { CreateCompany } from 'containers';
import { CompaniesProvider } from 'contexts';

export const Create = () => (
	<CompaniesProvider>
		<CreateCompany />
	</CompaniesProvider>
);
export default Create;

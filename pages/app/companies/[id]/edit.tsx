import { EditCompany } from 'containers';
import { CompaniesProvider } from 'contexts';

export const Edit = () => (
	<CompaniesProvider>
		<EditCompany />
	</CompaniesProvider>
);
export default Edit;

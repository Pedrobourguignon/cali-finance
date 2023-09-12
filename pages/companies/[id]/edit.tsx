import { EditCompany, EditCompanyMobile } from 'containers';
import { AuthProvider, CompaniesProvider } from 'contexts';

export const Edit = () => (
	<AuthProvider>
		<CompaniesProvider>
			<EditCompany />
		</CompaniesProvider>
		<CompaniesProvider>
			<EditCompanyMobile />
		</CompaniesProvider>
	</AuthProvider>
);
export default Edit;

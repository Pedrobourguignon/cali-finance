import { EditCompany, EditCompanyMobile } from 'containers';
import { CompaniesProvider } from 'contexts';

export const Edit = () => (
	<>
		<CompaniesProvider>
			<EditCompany />
		</CompaniesProvider>
		<CompaniesProvider>
			<EditCompanyMobile />
		</CompaniesProvider>
	</>
);
export default Edit;

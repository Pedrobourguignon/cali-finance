import { EditOrganization } from 'containers';
import { OrganizationsProvider } from 'contexts';

export const Edit = () => (
	<OrganizationsProvider>
		<EditOrganization />
	</OrganizationsProvider>
);
export default Edit;

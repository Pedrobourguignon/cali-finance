import { EditOrganization } from 'containers';
import { OrganizationsProvider } from 'contexts';
import { usePicasso } from 'hooks';

export const Edit = () => {
	const theme = usePicasso();
	return (
		<OrganizationsProvider>
			<EditOrganization />
		</OrganizationsProvider>
	);
};
export default Edit;

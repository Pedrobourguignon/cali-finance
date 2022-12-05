import { TeamsComponent } from 'components';
import { OrganizationsProvider } from 'contexts';

export const TeamsContainer = () => (
	<OrganizationsProvider>
		<TeamsComponent />
	</OrganizationsProvider>
);

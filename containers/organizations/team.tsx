import { TeamComponent } from 'components';
import { OrganizationsProvider, TeamsProvider } from 'contexts';

export const TeamContainer = () => (
	<OrganizationsProvider>
		<TeamsProvider>
			<TeamComponent />
		</TeamsProvider>
	</OrganizationsProvider>
);

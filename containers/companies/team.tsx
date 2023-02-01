import { TeamComponent } from 'components';
import { CompaniesProvider, TeamsProvider } from 'contexts';

export const TeamContainer = () => (
	<CompaniesProvider>
		<TeamsProvider>
			<TeamComponent />
		</TeamsProvider>
	</CompaniesProvider>
);

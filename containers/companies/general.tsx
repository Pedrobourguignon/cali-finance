import { GeneralComponent } from 'components';
import { AuthProvider, ProfileProvider } from 'contexts';

export const CompaniesContainer = () => (
	<ProfileProvider>
		<AuthProvider>
			<GeneralComponent />
		</AuthProvider>
	</ProfileProvider>
);

import { GeneralComponent } from 'components';
import { AuthProvider, CompaniesProvider, ProfileProvider } from 'contexts';

export const CompaniesContainer = () => (
	<ProfileProvider>
		<AuthProvider>
			<CompaniesProvider>
				<GeneralComponent />
			</CompaniesProvider>
		</AuthProvider>
	</ProfileProvider>
);

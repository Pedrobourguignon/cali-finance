import { GeneralComponent } from 'components';
import { CompaniesProvider, ProfileProvider } from 'contexts';

export const CompaniesContainer = () => (
	<ProfileProvider>
		<CompaniesProvider>
			<GeneralComponent />
		</CompaniesProvider>
	</ProfileProvider>
);

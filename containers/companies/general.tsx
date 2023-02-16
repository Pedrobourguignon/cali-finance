import { GeneralComponent } from 'components';
import { CompaniesProvider, ProfileProvider } from 'contexts';

export const CompaniesContainer = () => (
	<CompaniesProvider>
		<ProfileProvider>
			<GeneralComponent />
		</ProfileProvider>
	</CompaniesProvider>
);

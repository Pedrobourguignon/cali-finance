import { GeneralComponent } from 'components';
import { ProfileProvider } from 'contexts';

export const CompaniesContainer = () => (
	<ProfileProvider>
		<GeneralComponent />
	</ProfileProvider>
);

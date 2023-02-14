import { GeneralComponent } from 'components';
import { CompaniesProvider, ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks';

export const CompaniesContainer = () => {
	const isConnected = true;
	return (
		<ProfileProvider>
			<CompaniesProvider>
				<GeneralComponent />
			</CompaniesProvider>
		</ProfileProvider>
	);
};

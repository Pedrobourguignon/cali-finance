import { NotFoundContainer } from 'containers';
import { CompaniesProvider, ProfileProvider } from 'contexts';

export const NotFound = () => (
	<ProfileProvider>
		<CompaniesProvider>
			<NotFoundContainer />
		</CompaniesProvider>
	</ProfileProvider>
);

export default NotFound;

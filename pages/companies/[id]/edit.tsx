import { EditCompany, EditCompanyMobile } from 'containers';
import {
	AuthProvider,
	CompaniesProvider,
	ProfileProvider,
	TokensProvider,
} from 'contexts';

export const Edit = () => (
	<AuthProvider>
		<CompaniesProvider>
			<ProfileProvider>
				<TokensProvider>
					<EditCompany />
					<EditCompanyMobile />
				</TokensProvider>
			</ProfileProvider>
		</CompaniesProvider>
	</AuthProvider>
);
export default Edit;

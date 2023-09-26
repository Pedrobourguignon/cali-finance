import { OverviewTab, OverviewTabMobile } from 'containers';
import {
	AuthProvider,
	CompaniesProvider,
	ProfileProvider,
	TokensProvider,
} from 'contexts';

// export async function getServerSideProps(context: any) {
// 	const { id } = context.params;

// 	const token = context.req.cookies['cali-finance-authorization'];
// 	try {
// 		checkJwt(token);
// 		const tokenIsValid = await authClient.get(AUTH_SERVICE_ROUTES.checkToken);
// 		if (tokenIsValid) {
// 			await mainClient.get(`/company/${id}`);
// 			return {};
// 		}
// 		return {};
// 	} catch (err) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// }

export const Overview = () => (
	<AuthProvider>
		<CompaniesProvider>
			<ProfileProvider>
				<TokensProvider>
					<OverviewTab />
					<OverviewTabMobile />
				</TokensProvider>
			</ProfileProvider>
		</CompaniesProvider>
	</AuthProvider>
);

export default Overview;

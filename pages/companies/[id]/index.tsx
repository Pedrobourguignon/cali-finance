import { OverviewTab, OverviewTabMobile } from 'containers';
import { CompaniesProvider } from 'contexts';
import { AUTH_SERVICE_ROUTES } from 'helpers';
import { authClient, checkJwt, mainClient } from 'utils';

export async function getServerSideProps(context: any) {
	const { id } = context.params;
	const token = context.req.cookies['cali-finance-authorization'];
	try {
		checkJwt(token);
		const tokenIsValid = await authClient.get(AUTH_SERVICE_ROUTES.checkToken);
		if (tokenIsValid) {
			await mainClient.get(`/company/${id}`);
			return {};
		}
		return {};
	} catch (err) {
		return {
			notFound: true,
		};
	}
}

export const Overview = () => (
	<>
		<CompaniesProvider>
			<OverviewTab />
		</CompaniesProvider>
		<CompaniesProvider>
			<OverviewTabMobile />
		</CompaniesProvider>
	</>
);

export default Overview;
import { OverviewTab } from 'containers';
import { OrganizationsProvider } from 'contexts';

export const Overview = () => (
	<OrganizationsProvider>
		<OverviewTab />
	</OrganizationsProvider>
);

export default Overview;

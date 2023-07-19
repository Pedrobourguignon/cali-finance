import { OverviewTab, OverviewTabMobile } from 'containers';
import { CompaniesProvider } from 'contexts';

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

import { DashboardRightBar, OverviewComponent } from 'components';
import { AppLayout } from 'layouts';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';

export const OverviewTab = () => (
	<TokensProvider>
		<ProfileProvider>
			<CompaniesProvider>
				<AppLayout right={<DashboardRightBar />}>
					<OverviewComponent />
				</AppLayout>
			</CompaniesProvider>
		</ProfileProvider>
	</TokensProvider>
);

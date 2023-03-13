import { OverviewComponent, WithdrawalsBanner } from 'components';
import { AppLayout } from 'layouts';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';

export const OverviewTab = () => (
	<TokensProvider>
		<ProfileProvider>
			<CompaniesProvider>
				<AppLayout right={<WithdrawalsBanner />}>
					<OverviewComponent />
				</AppLayout>
			</CompaniesProvider>
		</ProfileProvider>
	</TokensProvider>
);

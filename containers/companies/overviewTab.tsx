import { DashboardRightBar, OverviewComponent } from 'components';
import { AppLayout } from 'layouts';

export const OverviewTab = () => (
	<AppLayout right={<DashboardRightBar />}>
		<OverviewComponent />
	</AppLayout>
);

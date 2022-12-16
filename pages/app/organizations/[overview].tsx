import { OverviewTab } from 'containers';
import { OrganizationsProvider } from 'contexts';
import { useRouter } from 'next/router';

export const Overview = () => {
	const router = useRouter();
	const { overview } = router.query;
	return (
		<OrganizationsProvider>
			<OverviewTab />
		</OrganizationsProvider>
	);
};

export default Overview;

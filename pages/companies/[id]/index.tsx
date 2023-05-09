import { OverviewTab, OverviewTabMobile } from 'containers';
import { CompaniesProvider } from 'contexts';
import { useRouter } from 'next/router';

export const Overview = () => {
	const router = useRouter();
	const { overview } = router.query;
	return (
		<>
			<CompaniesProvider>
				<OverviewTab />
			</CompaniesProvider>
			<CompaniesProvider>
				<OverviewTabMobile />
			</CompaniesProvider>
		</>
	);
};

export default Overview;

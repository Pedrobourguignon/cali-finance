import { OverviewComponent, WithdrawalsBanner } from 'components';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';

const teams = [
	{
		id: 1,
		name: 'Marketing',
		logo: '/images/team1.png',
		balance: 2234.05,
		members: 27,
	},
	{
		id: 2,
		name: 'Sales',
		logo: '/images/team2.png',
		balance: 92234.11,
		members: 170,
	},
	{
		id: 3,
		name: 'Finance',
		logo: '/images/team3.png',
		balance: 5234.11,
		members: 13,
	},
];

export const OverviewTab = () => {
	const theme = usePicasso();

	return (
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
};

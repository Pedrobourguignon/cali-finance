import { createContext, useMemo, useState } from 'react';
import { IOrganization, IActivities } from 'types';

interface IOrganizationsContext {
	organizations: IOrganization[];
	activities: IActivities[];
	totalFunds: string;
	totalTeams: string;
	totalMembers: string;
}

export const OrganizationsContext = createContext({} as IOrganizationsContext);

export const OrganizationsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [organizations, setOrganizations] = useState<IOrganization[]>([
		{
			name: 'Kylie Cosmetics',
			type: 'DAO',
			email: 'kyliecosmetics@gmail.com',
			members: 2,
			teams: ['marketing'],
			description: 'sahudahsadsa',
			logo: '',
			socialMedia: [
				{
					instagram: '@kyliecosmetics',
					telegram: 't/kyliecosmetics',
					twitter: 'twitter.com/kyliecosmetics',
					website: 'kyliecosmetics.net',
				},
			],
			funds: 2234.05,
		},
		{
			name: 'Kylie Skin',
			type: 'DAO',
			email: 'kylieskin@gmail.com',
			funds: 92234.11,
			members: 170,
			teams: ['marketing'],
			description: 'sahudahsadsa',
			logo: '',
			socialMedia: [
				{
					instagram: '@kylieskin',
					telegram: 't/kylieskin',
					twitter: 'twitter.com/kylieskin',
					website: 'kylieskin.net',
				},
			],
		},
		{
			name: 'Kylie Baby',
			type: 'DAO',
			email: 'kyliebaby@gmail.com',
			funds: 5234.11,
			members: 13,
			teams: ['marketing'],
			description: 'sahudahsadsa',
			logo: '',
			socialMedia: [
				{
					instagram: '@kyliebaby',
					telegram: 't/kyliebaby',
					twitter: 'twitter.com/kyliebaby',
					website: 'kyliebaby.net',
				},
			],
		},
	]);
	const [activities, setActivities] = useState<IActivities[]>([
		{
			name: 'Kylie Cosmetics',
			type: 'Deposit',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: 'Completed',
			value: 10.0,
		},
		{
			name: 'Kylie Skin',
			type: 'Deposit',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: 'Completed',
			value: 10.0,
		},
		{
			name: 'Kylie Baby',
			type: 'Deposit',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: 'Completed',
			value: 10.0,
		},
	]);
	const [totalFunds, setTotalFunds] = useState('');
	const [totalTeams, setTotalTeams] = useState('');
	const [totalMembers, setTotalMembers] = useState('');

	const calculateTotalFunds = () => {
		const funds = organizations.reduce(
			// eslint-disable-next-line no-shadow
			(total: number, organizations: IOrganization) =>
				total + organizations.funds,
			0
		);
		setTotalFunds(funds.toLocaleString('EN-us'));
	};

	const calculateTotalMembers = () => {
		const members = organizations.reduce(
			// eslint-disable-next-line no-shadow
			(total: number, organizations: IOrganization) =>
				total + +organizations.members,
			0
		);
		setTotalMembers(members.toString());
	};

	const calculateTotalTeams = () => {
		const teams = organizations.reduce(
			// eslint-disable-next-line no-shadow
			(total: number, organizations: IOrganization) =>
				total + organizations.teams.length,
			0
		);
		setTotalTeams(teams.toString());
	};

	useMemo(() => {
		calculateTotalFunds();
		calculateTotalMembers();
		calculateTotalTeams();
	}, [organizations]);

	const contextStates = useMemo(
		() => ({
			organizations,
			activities,
			totalFunds,
			totalTeams,
			totalMembers,
		}),
		[organizations, activities, totalFunds, totalTeams, totalMembers]
	);
	return (
		<OrganizationsContext.Provider value={contextStates}>
			{children}
		</OrganizationsContext.Provider>
	);
};

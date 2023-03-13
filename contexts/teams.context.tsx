import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { IEmployee, INewTeam, ITeam, ITeamsData } from 'types';

interface ITeamsContext {
	teams: ITeamsData[];
	setTeamPicture: Dispatch<SetStateAction<string>>;
	teamPicture: string;
	setMarketingEmployee: Dispatch<SetStateAction<IEmployee[]>>;
	marketingEmployee: IEmployee[];
	teamData: ITeam;
	setTeamData: Dispatch<SetStateAction<ITeam>>;
	setNewTeam: Dispatch<SetStateAction<INewTeam>>;
	newTeam: INewTeam;
}

const CompanyEmployees: IEmployee[] = [
	{
		name: 'Kim Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36B4CFE',
		picture: '/images/avatar.png',
		amount: 10.0,
		coin: 'USDT',
		team: 'General',
	},
	{
		name: 'Kylie Jenner',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36Z9EXD',
		picture: '/images/avatar.png',
		amount: 100.0,
		coin: 'USDT',
		team: 'Marketing',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		picture: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		picture: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		picture: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
];

export const TeamsContext = createContext({} as ITeamsContext);

export const TeamsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [teams, setTeams] = useState<ITeamsData[]>([]);
	const [newTeam, setNewTeam] = useState<INewTeam>({
		name: '',
		description: '',
		picture: '',
	});

	const [teamPicture, setTeamPicture] = useState('/images/team1.png');
	const [marketingEmployee, setMarketingEmployee] = useState<IEmployee[]>([
		{
			name: 'Kim Kardashian',
			wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36B4CFE',
			picture: '/images/avatar.png',
			amount: 10.0,
			coin: 'USDT',
			team: 'Marketing',
		},
		{
			name: 'Kylie Jenner',
			wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36Z9EXD',
			picture: '/images/avatar.png',
			amount: 100.0,
			coin: 'USDT',
			team: 'Marketing',
		},
	]);
	const [teamData, setTeamData] = useState<ITeam>({} as ITeam);

	useEffect(() => {
		setTeams([
			{
				id: 1,
				name: 'Marketing',
				logo: '/images/team1.png',
				balance: 12342.55,
				members: 27,
				employees: CompanyEmployees,
			},
			{
				id: 2,
				name: 'Sales',
				logo: '/images/team2.png',
				balance: 48365.05,
				members: 3,
				employees: CompanyEmployees,
			},
			{
				id: 3,
				name: 'Finance',
				logo: '/images/team3.png',
				balance: 123432.32,
				members: 120,
				employees: CompanyEmployees,
			},
		]);
	}, []);

	useEffect(() => {
		setTeamData({
			name: 'Marketing',
			funds: 2234.05,
			photo: '/images/team3.png',
			withdrawals: 87765.23,
			members: 356,
			description: 'marketing team of cali',
			employees: marketingEmployee,
		});
	}, [marketingEmployee]);

	const contextStates = useMemo(
		() => ({
			teams,
			setTeamPicture,
			teamPicture,
			setMarketingEmployee,
			marketingEmployee,
			teamData,
			setTeamData,
			setNewTeam,
			newTeam,
		}),
		[
			teams,
			setTeamPicture,
			teamPicture,
			setMarketingEmployee,
			marketingEmployee,
			teamData,
			setTeamData,
			setNewTeam,
			newTeam,
		]
	);
	return (
		<TeamsContext.Provider value={contextStates}>
			{children}
		</TeamsContext.Provider>
	);
};

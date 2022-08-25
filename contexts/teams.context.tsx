import { createContext, useMemo, useState } from 'react';

interface IEmployeeData {
	name: string;
	address: string;
	group: {
		name: string;
		color: string;
	};
	amount: number;
	withdrawable: number;
	coin: string;
}

interface ITeamsData {
	id: number;
	name: string;
	balance: number;
	employees: IEmployeeData[];
}

interface ITeamsContext {
	teams: ITeamsData[];
}

const employeeData: IEmployeeData[] = [
	{
		name: 'Bradley Cooper',
		address: '0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148',
		group: {
			name: 'Marketing',
			color: 'yellow.600',
		},
		amount: 15000,
		withdrawable: 192312,
		coin: 'USDT',
	},
	{
		name: 'Denzel Washington',
		address: '0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148',
		group: {
			name: 'Dev',
			color: 'green.600',
		},
		amount: 230789,
		withdrawable: 320,
		coin: 'USDT',
	},
	{
		name: 'Jackie Chan',
		address: '0x969Cf86eeb3f9354D89f357c8dFe43DE8e645148',
		group: {
			name: 'Business',
			color: 'blue.600',
		},
		amount: 1563,
		withdrawable: 1240,
		coin: 'USDT',
	},
];

export const TeamsContext = createContext({} as ITeamsContext);

export const TeamsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [teams] = useState<ITeamsData[]>([
		{ id: 1, name: 'Cali Team', balance: 123432, employees: employeeData },
	]);

	const contextStates = useMemo(
		() => ({
			teams,
		}),
		[teams]
	);
	return (
		<TeamsContext.Provider value={contextStates}>
			{children}
		</TeamsContext.Provider>
	);
};

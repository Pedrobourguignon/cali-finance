import { IEmployee } from 'types';

export interface ITeam {
	name: string;
	funds: number;
	members: number;
	withdrawals: number;
	description: string;
	photo: string;
	employees: IEmployee[];
}

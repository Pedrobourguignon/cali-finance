import { IEmployee } from 'types';

export interface ITeamsData {
	id?: number;
	name: string;
	logo: string;
	members: number;
	balance: number;
	employees?: IEmployee[];
}

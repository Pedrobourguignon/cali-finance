import { IEmployee, ISocialMedia } from 'types';

export interface ICompany {
	name: string;
	type: string;
	funds: number;
	email: string;
	members: number;
	logo: string;
	description?: string;
	socialMedias: ISocialMedia;
	teams: [string];
	selectedNetwork: string;
	employees?: IEmployee[];
	neededFunds: number;
}
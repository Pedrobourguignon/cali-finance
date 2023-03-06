import { IEmployee, ISocialMedia } from 'types';

export interface ICompanies {
	name: string;
	type: string;
	funds: number;
	email: string;
	members: number;
	picture: string;
	description?: string;
	socialMedias: ISocialMedia;
	teams: [string];
	selectedNetwork: string;
	employees?: IEmployee[];
	neededFunds: number;
}

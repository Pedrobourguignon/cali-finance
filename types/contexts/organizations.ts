import { ISocialMedia } from 'types';

export interface IOrganization {
	name: string;
	type: string;
	funds: number;
	email: string;
	members: number;
	logo: string;
	description?: string;
	socialMedia: ISocialMedia[];
	teams: [string];
}
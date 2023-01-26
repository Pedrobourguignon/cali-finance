import { ISocialMedia } from 'types';

export interface IEditedOrganization {
	name: string;
	type: string;
	email: string;
	logo: string;
	description?: string;
	socialMedias: ISocialMedia;
	selectedNetwork: string;
}

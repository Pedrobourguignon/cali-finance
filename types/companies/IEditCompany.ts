import { ISocialMedia } from 'types';

export interface IEditCompany {
	name: string;
	type: { label: string; value: string };
	email: string;
	network: { label: string; value: string; icon: string };
	description?: string;
	logo: string;
	socialMedias: ISocialMedia;
}

import { ILanguages } from 'types';

export interface IHistoryNotifications {
	created_at: string;
	event: {
		description: string;
		name: string;
	};
	id: number;
	meta: {
		data: {
			amount: number;
			companyId: number;
			companyName: string;
			companyLogo: string;
			event: string;
			teamId: number;
			userAddedWallet: string;
			userId: number;
			userWallet: string;
		};
		description: ILanguages;
	};
	wallet: string;
}

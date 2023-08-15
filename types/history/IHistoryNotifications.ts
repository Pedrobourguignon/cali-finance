import { ILanguages } from 'types';
import { EventName } from 'types/interfaces/main-server/events';

export interface IHistoryNotifications {
	created_at: string;
	event: {
		description: string;
		name: EventName;
	};
	id: number;
	meta: {
		data: {
			amount: number;
			companyId: number;
			companyName: string;
			companyLogo: string;
			event: EventName;
			teamId: number;
			userAddedWallet: string;
			userId: number;
			userWallet: string;
		};
		description: ILanguages;
	};
	wallet: string;
}

import { ILanguages } from 'types';

export interface INotificationList {
	created_at: string;
	meta: {
		data: {
			userAddedWallet: string;
			companyId: number;
			teamId: number;
			userId: number;
			event: string;
		};
		description: ILanguages;
	};
}

export interface INotificationPopover {
	onClose: () => void;
	onOpen?: () => void;
	isOpen: boolean;
}

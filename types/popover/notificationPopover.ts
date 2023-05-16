import { Dispatch, SetStateAction } from 'react';

export interface INotificationList {
	created_at: string;
	event: {
		name: string;
		description: string;
	};
	id: number;
	meta: {
		data: {
			userAddedWallet: string;
			companyName: string;
			companyId: number;
			teamId: number;
			userId: number;
		};
		description: {
			enDescription: string;
			ptDescription: string;
		};
		icon: string;
	};
	wallet: string;
}

export interface INotificationPopover {
	notificationsList: INotificationList[];
	onClose: () => void;
	onOpen?: () => void;
	isOpen: boolean;
	setNotificationsList: Dispatch<SetStateAction<INotificationList[]>>;
}

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
			companyId: number;
			teamId: number;
			userId: number;
		};
		description: string;
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

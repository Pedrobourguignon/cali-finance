import { Dispatch, SetStateAction } from 'react';

export interface INotificationList {
	type: string;
	date: string;
	icon: string;
}

export interface INotificationPopover {
	notificationsList: INotificationList[];
	notificationNumber: number;
	onClose: () => void;
	onOpen: () => void;
	isOpen: boolean;
	setNotificationsList: Dispatch<SetStateAction<INotificationList[]>>;
}
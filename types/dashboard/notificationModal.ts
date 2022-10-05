export interface INotificationList {
	type: string;
	date: string;
	icon: string;
}

export interface INotificationModal {
	notificationsList: INotificationList[];
	notificationNumber: number;
	isOpen: boolean;
	onClose: () => void;
}

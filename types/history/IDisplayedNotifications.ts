import { INotificationList } from 'types';

export interface IDisplayedNotifications {
	filteredNotifications: INotificationList[];
	pagesVisited: number;
	notificationPerPage: number;
}

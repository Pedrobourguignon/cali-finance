import { IHistoryNotification } from 'types';

export interface IDisplayedNotifications {
	filteredNotifications: IHistoryNotification[];
	pagesVisited: number;
	notificationPerPage: number;
}

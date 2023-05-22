import { IHistoryNotifications } from 'types';

export interface IDisplayedNotifications {
	filteredNotifications: IHistoryNotifications[];
	pagesVisited: number;
	notificationPerPage: number;
}

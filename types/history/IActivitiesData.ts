import { ICompany } from 'types/interfaces/main-server/ICompany';
import { INotificationList } from 'types/popover';

export interface IActivitiesData {
	activities: INotificationList;
	company: ICompany;
}

import { ICompany } from 'types/interfaces/main-server/ICompany';
import { IHistoryNotifications } from 'types';

export interface IActivitiesData {
	activities: IHistoryNotifications;
	company: ICompany;
}

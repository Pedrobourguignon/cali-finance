import { Icon } from '@chakra-ui/react';
import { INotificationList } from 'types/popover';

export interface IHistoryNotification {
	companyIcon: typeof Icon;
	company: string;
	userWalletAddress: string;
	userTeam: string;
	userIcon: typeof Icon;
	type: string;
	typeIcon: typeof Icon;
	date: string;
	value: string;
	status: string;
}

export interface IHistoryPage {
	history?: IHistoryNotification[];
	notifications?: INotificationList[];
}

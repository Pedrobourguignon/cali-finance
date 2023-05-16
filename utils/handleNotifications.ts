import { INotificationList } from 'types';

export const handleNotifications = (
	notification: INotificationList,
	locale = 'en-US'
) => {
	if (notification.event.description === 'Member added to company')
		return {
			icon: '/icons/add-user.svg',
			text:
				locale === 'en-US'
					? notification.meta.description.enDescription
					: notification.meta.description.ptDescription,
		};
	if (notification.event.description === 'Created company')
		return {
			icon: '/icons/companies.svg',
			text:
				locale === 'en-US'
					? notification.meta.description.enDescription
					: notification.meta.description.ptDescription,
		};
	return {
		icon: '',
		text: '',
	};
};

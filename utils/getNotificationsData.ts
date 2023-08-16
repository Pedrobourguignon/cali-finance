import { EventName } from 'types/interfaces/main-server/events';
import { notificationsData } from 'utils';

export const getNotificationsData = (eventName: EventName) => {
	const eventData = notificationsData[eventName];
	if (!eventData) {
		return { icon: '/icons/exclamation.svg', text: 'eventNotFound' };
	}
	return eventData;
};

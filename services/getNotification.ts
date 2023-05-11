import { collection, getDocs, Firestore } from 'firebase/firestore';

export const getNotifications = async (firestore: Firestore) => {
	const notificationsCol = collection(firestore, 'notifications');
	const notificationsSnapshot = await getDocs(notificationsCol);
	const notificationList = notificationsSnapshot.docs.map(doc => doc.data());
	return notificationList;
};

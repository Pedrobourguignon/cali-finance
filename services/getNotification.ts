import { Firestore, doc, getDoc } from 'firebase/firestore';

export const getNotifications = async (
	firestore: Firestore,
	wallet: string
) => {
	const notificationsCol = doc(firestore, 'notifications', wallet);
	const notificationsSnapshot = await getDoc(notificationsCol);
	return notificationsSnapshot.data();
};

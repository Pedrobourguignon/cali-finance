import { deleteDoc, doc, Firestore } from 'firebase/firestore';

export const deleteNotifications = async (
	firestore: Firestore,
	wallet: string
) => {
	const notificationsRef = doc(firestore, 'notifications', wallet);
	await deleteDoc(notificationsRef);
};

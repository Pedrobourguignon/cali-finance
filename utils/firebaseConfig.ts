import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDSdg8n1ZDDrhGsa7NQEjw6-SmfcWUqp-4',
	authDomain: 'cali-finance.firebaseapp.com',
	databaseURL: 'https://cali-finance-default-rtdb.firebaseio.com',
	projectId: 'cali-finance',
	storageBucket: 'cali-finance.appspot.com',
	messagingSenderId: '643079941955',
	appId: '1:643079941955:web:e3bfd6eb30bdfd8ef009f6',
	measurementId: 'G-DNG0PDVQF9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };

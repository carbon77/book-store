import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
import { initializeApp } from 'firebase/app'

// Данные конфигурации Firebase приложения
const firebaseConfig = {
	apiKey: 'AIzaSyD0G-l8NTLltbp4ugvWfbQjj8ALKS8s3Lw',
	authDomain: 'book-store-83a29.firebaseapp.com',
	databaseURL: 'https://book-store-83a29-default-rtdb.firebaseio.com',
	projectId: 'book-store-83a29',
	storageBucket: 'book-store-83a29.appspot.com',
	messagingSenderId: '142506729141',
	appId: '1:142506729141:web:ce2023554ae88d8a6aa8fc',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app, 'gs://book-store-83a29.appspot.com')
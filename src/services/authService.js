import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
} from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import { User, userConverter } from '../models/User'
import { auth, db } from './index'

// Сервис для работы с авторизацией
export default {
	// Создание пользователя
	async createUser(name, email, password) {
		const id =  await createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => user.uid)
		const user = new User(id, name, email)
		user.createdAt = Date.now()

		const ref = doc(db, 'users', id).withConverter(userConverter)
		await setDoc(ref, user)

		return user
	},

	// Авторизация пользователя
	async signIn(email, password) {
		return await signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => user.uid)
	},

	// Выход пользователя из системы
	async signOut() {
		await firebaseSignOut(auth)
	},
}
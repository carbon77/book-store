import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
} from '@firebase/auth'
import { auth } from './index'

// Сервис для работы с авторизацией
export default {
	// Создание пользователя
	async createUser(email, password) {
		return await createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => ( {
				id: user.uid,
				email: user.email,
			} ))
	},

	// Авторизация пользователя
	async signIn(email, password) {
		return await signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => ( {
				id: user.uid,
				email: user.email,
			} ))
	},

	// Выход пользователя из системы
	async signOut() {
		await firebaseSignOut(auth)
	},
}
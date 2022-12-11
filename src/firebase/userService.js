import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { userConverter } from '../models/User'
import { db, storage } from './index'

// Сервис для работы с пользователями
export default {
	// Получение данных об учётной записи
	async fetchUser(userId) {
		const ref = doc(db, 'users', userId).withConverter(userConverter)
		const snapshot = await getDoc(ref)

		if (snapshot.exists()) {
			return snapshot.data()
		}
		throw new Error('No such user')
	},

	// Обновление учётной записи
	async updateUser(userId, info) {
		await updateDoc(doc(db, 'users', userId), info)
	},

	// Обновление аватара пользователя
	async uploadAvatar(userId, file) {
		const snapshot = await uploadBytes(ref(storage, 'avatars/' + userId + '.jpg'), file)
		const url = await getDownloadURL(ref(storage, 'avatars/' + userId + '.jpg'))
		await this.updateUser(userId, {
			avatarUrl: url
		})
		return url
	},
}
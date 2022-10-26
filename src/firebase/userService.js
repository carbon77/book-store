import { doc, getDoc, setDoc } from '@firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { db, storage } from './index'

export default {
	async loadUserInfo(userId) {
		const ref = doc(db, "userInfo", userId)
		const snapshot = await getDoc(ref)

		if (snapshot.exists()) {
			return snapshot.data()
		}
		throw new Error("No such user")
	},

	async setUserInfo(userId, info) {
		await setDoc(doc(db, "userInfo", userId), info)
	},

	async downloadAvatar(userId) {
		let url
		try {
			url = await getDownloadURL(ref(storage, 'avatars/' + userId + '.jpg'));
		} catch (e) {
			url = null
		}
		return url
	},

	async uploadAvatar(userId, file) {
		const snapshot = await uploadBytes(ref(storage, 'avatars/' + userId + '.jpg'), file);
		return await this.downloadAvatar(userId)
	},
}
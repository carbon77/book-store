import { doc, getDoc } from '@firebase/firestore'
import { db } from './index'

export default {
	async loadUserInfo(userId) {
		const ref = doc(db, "userInfo", userId)
		const snapshot = await getDoc(ref)

		if (snapshot.exists()) {
			return snapshot.data()
		}
		throw new Error("No such user")
	}
}
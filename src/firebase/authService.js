import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from '@firebase/auth'
import { auth } from './index'

export default {
	async createUser(email, password) {
		return await createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => ( {
				id: user.uid,
				email: user.email,
			} ))
	},

	async signIn(email, password) {
		return await signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => ( {
				id: user.uid,
				email: user.email,
			} ))
	},

	async signOut() {
		await firebaseSignOut(auth)
	}
}
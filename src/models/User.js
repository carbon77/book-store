import { Timestamp } from '@firebase/firestore'

export class User {
	cart = []
	avatarUrl = ''
	lastName = ''
	createdAt = 0

	constructor(id, firstName, email) {
		this.id = id
		this.firstName = firstName
		this.email = email
	}

	get name() {
		return this.firstName + ' ' + this.lastName
	}
}

export const userConverter = {
	toFirestore: user => {
		return {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			cart: user.cart,
			createdAt: Timestamp.fromMillis(user.createdAt),
			avatarUrl: user.avatarUrl,
		}
	},

	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options)
		const user = new User(snapshot.id, data.firstName, data.email)
		user.cart = data.cart
		user.avatarUrl = data.avatarUrl
		user.lastName = data.lastName
		user.createdAt = data.createdAt.seconds * 1000

		return user
	}
}
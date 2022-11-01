import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from '@firebase/firestore'
import { db } from './index'

export default {
	async loadBooks() {
		let snapshot = await getDocs(collection(db, 'books'))
		let books = []

		snapshot.forEach(doc => {
			books.push({ id: doc.id, ...doc.data(), releaseDate: doc.data().releaseDate.seconds })
		})

		return books
	},

	async loadBook(bookId) {
		let bookReference = doc(db, 'books', bookId)
		let snapshot = await getDoc(bookReference)

		if (snapshot.exists()) {
			let book = { id: snapshot.id, ...snapshot.data(), releaseDate: snapshot.data().releaseDate.seconds }
			return book
		}
	},

	async loadReviews() {
		let snapshot = await getDocs(collection(db, 'reviews'))
		let reviews = []

		snapshot.forEach(doc => {
			reviews.push({ id: doc.id, ...doc.data(), creationDate: doc.data().creationDate.seconds })
		})

		return reviews
	},

	async addBookToCart(userId, bookId) {
		const userRef = doc(db, 'userInfo', userId)
		await updateDoc(userRef, {
			cart: arrayUnion(bookId),
		})
	},

	async removeBookFromCart(userId, bookId) {
		const userRef = doc(db, 'userInfo', userId)
		await updateDoc(userRef, {
			cart: arrayRemove(bookId),
		})
	},
}
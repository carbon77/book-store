import { collection, getDocs, query } from '@firebase/firestore'
import { db } from './index'

export default {
	async loadBooks() {
		let snapshot = await getDocs(collection(db, 'books'))
		let books = []

		snapshot.forEach(doc => {
			books.push({ id: doc.id, ...doc.data(), releaseDate: doc.data().seconds })
		})

		return books
	},
}
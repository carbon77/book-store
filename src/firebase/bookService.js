import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from '@firebase/firestore'
import { db } from './index'

// Сервис для работы с книгами
export default {
	// Загрузка книг
	async loadBooks() {
		let snapshot = await getDocs(collection(db, 'books'))
		let books = []

		snapshot.forEach(doc => {
			books.push({ id: doc.id, ...doc.data(), releaseDate: doc.data().releaseDate.seconds })
		})

		return books
	},

	// Загрузка конкретной книги
	async loadBook(bookId) {
		let bookReference = doc(db, 'books', bookId)
		let snapshot = await getDoc(bookReference)

		if (snapshot.exists()) {
			let book = { id: snapshot.id, ...snapshot.data(), releaseDate: snapshot.data().releaseDate.seconds }
			return book
		}
	},

	// Загрузка отзывов
	async loadReviews() {
		let snapshot = await getDocs(collection(db, 'reviews'))
		let reviews = []

		snapshot.forEach(doc => {
			reviews.push({ id: doc.id, ...doc.data(), creationDate: doc.data().creationDate.seconds })
		})

		return reviews
	},

	// Добавление книги в корзину пользователя
	async addBookToCart(userId, bookId) {
		const userRef = doc(db, 'userInfo', userId)
		await updateDoc(userRef, {
			cart: arrayUnion(bookId),
		})
	},

	// Удаление книги из корзины пользователя
	async removeBookFromCart(userId, bookId) {
		const userRef = doc(db, 'userInfo', userId)
		await updateDoc(userRef, {
			cart: arrayRemove(bookId),
		})
	},
}
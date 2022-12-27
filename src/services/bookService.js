import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	Timestamp,
	updateDoc,
} from '@firebase/firestore'
import { db } from './index'
import userService from './userService'

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
	async loadReviews(bookId) {
		let snapshot = await getDocs(collection(db, 'books', bookId, 'reviews'))
		let reviews = []

		snapshot.forEach(doc => {
			reviews.push({
				id: doc.id,
				...doc.data(),
				creationDate: doc.data().creationDate.seconds,
			})
		})

		return reviews
	},

	// Добавление книги в корзину пользователя
	async addBookToCart(userId, bookId) {
		await userService.updateUser(userId, {
			cart: arrayUnion(bookId)
		})
	},

	// Удаление книги из корзины пользователя
	async removeBookFromCart(userId, bookId) {
		await userService.updateUser(userId, {
			cart: arrayRemove(bookId),
		})
	},

	// Добавление отзыва книге
	async addReviewToBook(user, bookId, { text, rating }) {
		const review = {
			user: user.name,
			userId: user.id,
			userAvatar: user.avatarUrl,
			text,
			rating,
			likes: 0,
			dislikes: 0,
			creationDate: Timestamp.fromMillis(Date.now()),
		}
		const reviewRef = await addDoc(collection(db, 'books', bookId, 'reviews'), review)
		return { ...review, id: reviewRef.uid }
	},
}
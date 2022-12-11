import { createSlice } from '@reduxjs/toolkit'
import bookService from '../../firebase/bookService'

export const bookSlice = createSlice({
	name: 'book',
	initialState: {
		books: [],
		currentBook: null,
		reviews: [],
	},
	reducers: {
		setBooks: (state, action) => {
			state.books = action.payload
		},

		setCurrentBook: (state, action) => {
			state.currentBook = action.payload
		},

		setReviews: (state, action) => {
			state.reviews = action.payload
		},

		addReview: (state, action) => {
			state.reviews = [...state.reviews, action.payload]
		}
	},
})

export default bookSlice.reducer

// Actions
export const { setBooks, setCurrentBook, setReviews, addReview } = bookSlice.actions

// Selectors
export const selectBooks = state => state.book.books
export const selectCurrentBook = state => state.book.currentBook
export const selectReviews = state => state.book.reviews

// Thunks
export function fetchBooks() {
	return async (dispatch, getState) => {
		const books = await bookService.loadBooks()
		dispatch(setBooks(books))
	}
}

export function fetchBookById(bookId) {
	return async (dispatch, getState) => {
		const book = await bookService.loadBook(bookId)
		dispatch(setCurrentBook(book))
	}
}

export function fetchReviews(bookId) {
	return async (dispatch, getState) => {
		const reviews = await bookService.loadReviews(bookId)
		dispatch(setReviews(reviews))
	}
}

export function addReviewToBook(user, bookId, { text, rating }) {
	return async (dispatch, getState) => {
		const review = await bookService.addReviewToBook(user, bookId, { text, rating })
		dispatch(addReview(review))
	}
}
import { createSlice } from '@reduxjs/toolkit'
import bookService from '../../firebase/bookService'

export const bookSlice = createSlice({
	name: 'book',
	initialState: {
		books: []
	},
	reducers: {
		setBooks: (state, action) => {
			state.books = action.payload
		}
	}
})

export default bookSlice.reducer

// Actions
export const { setBooks } = bookSlice.actions

// Selectors
export const selectBooks = state => state.book.books

// Thunks
export function fetchBooks() {
	return async (dispatch, getState) => {
		const books = await bookService.loadBooks()
		dispatch(setBooks(books))
	}
}
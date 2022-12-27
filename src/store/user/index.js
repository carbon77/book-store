import { createSlice } from '@reduxjs/toolkit'
import authService from '../../services/authService'
import bookService from '../../services/bookService'
import userService from '../../services/userService'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			if (!action.payload) {
				state.user = null
			} else {
				state.user = action.payload
			}
		},

		addBook: (state, action) => {
			state.user = { ...state.user, cart: [...state.user.cart, action.payload] }
		},

		removeBook: (state, action) => {
			state.user = {
				...state.user,
				cart: state.user.cart.filter(book => book !== action.payload),
			}
		},
	},
})

export default userSlice.reducer

// Actions
export const { setUser, setUserInfo, addBook, removeBook } = userSlice.actions

// Selectors
export const selectUser = (state) => state.user.user
export const selectCart = (state) => state.user.user.cart

// Thunk actions
export function login(email, password) {
	return async (dispatch, getState) => {
		const id = await authService.signIn(email, password)
		const user = await userService.fetchUser(id)
		dispatch(setUser({ ...user }))
	}
}

export function loadUser(userId) {
	return async (dispatch, getState) => {
		const user = await userService.fetchUser(userId)
		dispatch(setUser({ ...user }))
	}
}

export function updateUserInfo(info) {
	return async (dispatch, getState) => {
		const userId = getState().id
		await userService.updateUser(userId, info)
		dispatch(setUserInfo(info))
	}
}

export function uploadAvatar(userId, file) {
	return async (dispatch, getState) => {
		const avatarUrl = await userService.uploadAvatar(userId, file)
		dispatch(setUserInfo({ avatarUrl }))
	}
}

export function signOut() {
	return async (dispatch, getState) => {
		await authService.signOut()
		dispatch(setUser(null))
	}
}

export function createUser(name, email, password) {
	return async (dispatch) => {
		const user = await authService.createUser(name, email, password)
		dispatch(setUser({ ...user }))
	}
}

export function addBookToCart(userId, bookId) {
	return async (dispatch) => {
		await bookService.addBookToCart(userId, bookId)
		dispatch(addBook(bookId))
	}
}

export function removeBookFromCart(userId, bookId) {
	return async (dispatch) => {
		await bookService.removeBookFromCart(userId, bookId)
		dispatch(removeBook(bookId))
	}
}
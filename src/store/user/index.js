import { createSlice } from '@reduxjs/toolkit'
import authService from '../../firebase/authService'
import userService from '../../firebase/userService'

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
				state.user = { ...action.payload }
			}
		},

		setUserInfo: (state, action) => {
			state.user = { ...state.user, ...action.payload }
		},
	},
})

// Actions
export const { setUser, setUserInfo } = userSlice.actions

// Selectors
export const selectUser = (state) => state.user.user

// Thunk actions
export function login(email, password) {
	return async (dispatch, getState) => {
		const user = await authService.signIn(email, password)
		const userInfo = await userService.loadUserInfo(user.id)
		dispatch(setUser({ ...user, ...userInfo }))
	}
}

export function loadUserInfo(userId) {
	return async (dispatch, getState) => {
		const userInfo = await userService.loadUserInfo(userId)
		dispatch(setUserInfo(userInfo))
	}
}

export function signOut() {
	return async (dispatch, getState) => {
		await authService.signOut()
		dispatch(setUser(null))
	}
}

export default userSlice.reducer
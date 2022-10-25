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
			state.user = { ...action.payload }
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

export default userSlice.reducer
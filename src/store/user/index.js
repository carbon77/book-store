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

export default userSlice.reducer

// Actions
export const { setUser, setUserInfo } = userSlice.actions

// Selectors
export const selectUser = (state) => state.user.user

// Thunk actions
export function login(email, password) {
	return async (dispatch, getState) => {
		const user = await authService.signIn(email, password)
		const userInfo = await userService.loadUserInfo(user.id)
		const avatarUrl = await userService.downloadAvatar(user.id)
		dispatch(setUser({ ...user, ...userInfo, avatarUrl }))
	}
}

export function loadUserInfo(userId) {
	return async (dispatch, getState) => {
		const userInfo = await userService.loadUserInfo(userId)
		const avatarUrl = await userService.downloadAvatar(userId)
		dispatch(setUserInfo({ ...userInfo, avatarUrl }))
	}
}

export function updateUserInfo(info) {
	return async (dispatch, getState) => {
		const userId = getState().id
		await userService.setUserInfo(userId, info)
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
		const user = await authService.createUser(email, password)
		await userService.setUserInfo(user.id, { name })

		dispatch(setUser({ ...user, name }))
	}
}
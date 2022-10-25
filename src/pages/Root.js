import '#src/styles/root.sass'
import { onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { auth } from '../firebase'
import { loadUserInfo, setUser } from '../store/user'

function Root() {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(setUser({
					id: user.uid,
					email: user.email,
				}))
				dispatch(loadUserInfo(user.uid))
			}
			setIsLoading(false)
		})
	}, [])

	if (isLoading) {
		return <div>Is loading...</div>
	}

	return (
		<div>
			<Header/>
			<main>
				<Outlet/>
			</main>
		</div>
	)
}

export default Root
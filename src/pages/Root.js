import '#src/styles/root.sass'
import { onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { auth } from '../firebase'
import { fetchBooks } from '../store/book'
import { loadUserInfo, setUser } from '../store/user'

function Root() {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const [isCartOpen, setIsCartOpen] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(setUser({
					id: user.uid,
					email: user.email,
				}))
				dispatch(loadUserInfo(user.uid))
				dispatch(fetchBooks())
			}
			setIsLoading(false)
		})
	}, [])

	if (isLoading) {
		return <div>Is loading...</div>
	}

	return (
		<>
			<Header setIsCartOpen={setIsCartOpen}/>
			<main>
				<Outlet/>
			</main>
			<Footer/>
			<Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
		</>
	)
}

export default Root
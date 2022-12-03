import '#src/styles/root.sass'
import { onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { auth } from '../firebase'
import { fetchBooks } from '../store/book'
import { loadUserInfo, setUser } from '../store/user'

// Корневой компонент навигации, все компоненты для страниц будут внутри него
function Root() {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const [isCartOpen, setIsCartOpen] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		// Слушатель для проверки авторизации пользователя
		onAuthStateChanged(auth, user => {
			Promise.all([
				user ? dispatch(setUser({id : user.uid, email: user.email})) : null,
				user ? dispatch(loadUserInfo(user.uid)) : null,
				dispatch(fetchBooks())
			]).then(() => {
				setIsLoading(false)
			})
		})
	}, [])

	if (isLoading) {
		return <Loader />
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
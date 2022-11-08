import React from 'react'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import BookPage from './pages/BookPage'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import MyBooksPage from './pages/MyBooksPage'
import Root from './pages/Root'
import UserPage from './pages/UserPage'
import AboutMe from './pages/UserPage/AboutMe'
import UserInfo from './pages/UserPage/UserInfo'

window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${ vh }px`)
})

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root/>,
		children: [
			{
				index: true,
				element: <HomePage/>,
			},
			{
				path: 'books/:bookId',
				element: <BookPage/>,
			},
			{
				path: 'cart',
				element: <CartPage/>,
			},
			{
				path: 'my-books',
				element: <MyBooksPage/>,
			},
			{
				path: 'user',
				element: <UserPage/>,
				children: [
					{
						path: 'info',
						element: <UserInfo/>,
					},
					{
						path: 'about_me',
						element: <AboutMe/>,
					},
					{
						path: 'history',
						element: <div className={ 'block-title' }><h2>История операция</h2></div>,
					},
					{
						path: 'payment',
						element: <div className={ 'block-title' }><h2>Способы оплаты</h2></div>,
					},
				],
			},
		],
	},
], {
	basename: '/book-store',
})

function App() {
	return <RouterProvider router={ router }/>
}

export default App

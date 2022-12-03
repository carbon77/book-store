import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import BookPage from './pages/BookPage'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import MyBooksPage from './pages/MyBooksPage'
import Root from './pages/Root'
import UserPage from './pages/UserPage'
import AboutMe from './pages/UserPage/AboutMe'
import PaymentInfo from './pages/UserPage/PaymentInfo'
import UserHistory from './pages/UserPage/UserHistory'
import UserInfo from './pages/UserPage/UserInfo'

// Объект роутера - главный объект для навигации
export default createBrowserRouter([
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
						element: <UserHistory/>,
					},
					{
						path: 'payment',
						element: <PaymentInfo/>,
					},
				],
			},
		],
	},
], { basename: '/book-store' })
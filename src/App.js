import React from 'react'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import BookPage from './pages/BookPage'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import MyBooksPage from './pages/MyBooksPage'
import Root from './pages/Root'
import UserPage from './pages/UserPage'
import UserInfo from './pages/UserPage/UserInfo'

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
						element: <div>Обо мне</div>,
					},
					{
						path: 'history',
						element: <div>История операция</div>,
					},
					{
						path: 'payment',
						element: <div>Способы оплаты</div>,
					},
				],
			},
		],
	},
], {
	basename: '/book-store'
})

function App() {
	return <RouterProvider router={ router }/>
}

export default App

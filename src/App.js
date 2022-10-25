import React from 'react'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Root from './pages/Root'
import UserPage from './pages/UserPage'

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
				path: "user",
				element: <UserPage />
			}
		],
	},
])

function App() {
	return (
		<div>
			<RouterProvider router={ router }/>
		</div>
	)
}

export default App

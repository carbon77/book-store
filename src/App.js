import React from 'react'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/HomePage'
import Root from './pages/Root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root/>,
		children: [
			{
				index: true,
				element: <Home/>,
			},
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

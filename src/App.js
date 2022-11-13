import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { RouterProvider } from 'react-router'
import router from './router'
import store from './store'

window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${ vh }px`)
})

function App() {
	return (
		<StoreProvider store={ store }>
			<RouterProvider router={ router }/>
		</StoreProvider>
	)
}

export default App

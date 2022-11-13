import React from 'react'
import Provider from 'react-redux'
import { RouterProvider } from 'react-router'
import router from './router'
import store from './store'

window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${ vh }px`)
})

function App() {
	return (
		<Provider store={ store }>
			<RouterProvider router={ router }/>
		</Provider>
	)
}

export default App

import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { RouterProvider } from 'react-router'
import router from './router'
import store from './store'

// Слушатель необходим для вычисления высоты страницы из-за строки поиска в мобильных браузерах
// Высота необходима для корзины
window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${ vh }px`)
})

// Корневой комонент, здесь инициализируется redux-хранилище и роутер
function App() {
	return (
		<StoreProvider store={ store }>
			<RouterProvider router={ router }/>
		</StoreProvider>
	)
}

export default App

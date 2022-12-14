import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookRow from '../../components/BookRow'
import Loader from '../../components/Loader'
import { selectBooks } from '../../store/book'
import './homePage.sass'

// Компонент для домашней страницы
function HomePage() {
	const books = useSelector(selectBooks)
	const dispatch = useDispatch()
	const [isLoadingBooks, setIsLoadingBooks] = useState(false)

	if (!books?.length) return <Loader/>

	return (
		<div className={ 'home-page-container' }>
			<div className="block">
				{ isLoadingBooks ? <Loader/> : <>
					<div className="block-body">
						<h3 className={ 'block__section-title' }>Рекоммендации</h3>
						<BookRow books={ books.filter(book => book.genre !== 'Программирование') }/>
						<div className="divider"/>
						<h3 className={ 'block__section-title' }>Программирование</h3>
						<BookRow books={ books.filter(book => book.genre === 'Программирование') } size={ 'large' }/>
					</div>
				</> }
			</div>
		</div>
	)
}

export default HomePage
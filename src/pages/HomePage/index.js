import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookRow from '../../components/BookRow'
import Loader from '../../components/Loader'
import { fetchBooks, selectBooks } from '../../store/book'
import './homePage.sass'

function HomePage() {
	const books = useSelector(selectBooks)
	const dispatch = useDispatch()
	const [isLoadingBooks, setIsLoadingBooks] = useState(true)

	useEffect(() => {
		if (!books.length) {
			dispatch(fetchBooks()).then(() => {
				setIsLoadingBooks(false)
			})
		} else {
			setIsLoadingBooks(false)
		}
	}, [])

	return (
		<div className={ 'home-page-container' }>
			<div className="block">
				{ isLoadingBooks ? <Loader/> : <>
					<div className="block-body">
						<h3>Рекоммендации</h3>
						<BookRow books={ books.filter(book => book.genre !== 'Программирование') }/>
						<div className="divider"/>
						<h3>Программирование</h3>
						<BookRow books={ books.filter(book => book.genre === 'Программирование') } size={ 'large' }/>
					</div>
				</> }
			</div>
		</div>
	)
}

export default HomePage
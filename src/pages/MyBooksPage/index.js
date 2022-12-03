import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import CartPageItem from '../../components/Cart/CartPageItem'
import Input from '../../components/Input'
import List from '../../components/List'
import { selectBooks } from '../../store/book'
import { selectUser } from '../../store/user'
import './myBookPage.sass'

// Компонент для страницы "Мои книги"
function MyBooksPage() {
	const user = useSelector(selectUser)
	const books = useSelector(selectBooks)
	const [showBooks, setShowBooks] = useState(books)
	const navigate = useNavigate()
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		if (!user) navigate('')
	}, [user])

	useEffect(() => {
		const sq = searchQuery.toLowerCase()
		setShowBooks(books.filter(book => book.name.toLowerCase().includes(sq) || book.author.toLowerCase().includes(sq)))
	}, [searchQuery])

	return (
		<div className={ 'mybooks-page' }>
			<div className="row">
				<div className="col">
					<div className="block">
						<div className="block-title">
							<h3>Мои книги</h3>
						</div>
						<div className="block-body">
							<div className="search-field">
								<label htmlFor={ 'mybook-search-input' }>Поиск:</label>
								<Input
									className={ 'search-input' }
									id={ 'mybook-search-input' }
									placeholder={ 'Введите название, автора...' }
									value={ searchQuery }
									onChange={ e => setSearchQuery(e.target.value) }
								/>
							</div>
							<div className="divider"/>
							<List
								className={ 'wrap list-row jc-center list-gap-1' }
								items={ showBooks }
								getKey={ book => book.id }
								render={ book => <CartPageItem user={ user } book={ book } removable={ false }/> }
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyBooksPage
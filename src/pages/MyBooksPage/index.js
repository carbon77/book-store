import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import CartPageItem from '../../components/Cart/CartPageItem'
import List from '../../components/List'
import { selectBooks } from '../../store/book'
import { selectUser } from '../../store/user'
import "./myBookPage.sass"

function MyBooksPage() {
	const user = useSelector(selectUser)
	const books = useSelector(selectBooks)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) navigate('')
	}, [user])

	return (
		<div className={'mybooks-page'}>
			<div className="row">
				<div className="col">
					<div className="block">
						<div className="block-title">
							<h3>Мои книги</h3>
						</div>
						<div className="block-body">
							<List
								className={'wrap list-row jc-center list-gap-1'}
								items={books}
								getKey={book => book.id}
								render={book => <CartPageItem user={user} book={book} removable={false}/>}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyBooksPage
import "./cartPage.sass"
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import CartPageItem from '../../components/Cart/CartPageItem'
import List from '../../components/List'
import { selectBooks } from '../../store/book'
import { selectUser } from '../../store/user'
import { show } from '../../utils/notify'

function CartPage() {
	const user = useSelector(selectUser)
	const books = useSelector(selectBooks)
	const dispatch = useDispatch()
	const [userBooks, setUserBooks] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)

	useEffect(() => {
		if (user && user.cart && books) {
			setTotalPrice(user.cart.reduce((previous, current) => {
				const book = books.find(book => book.id === current)
				return previous + book.price
			}, 0))

			setUserBooks(books.filter(book => user.cart.includes(book.id)))
		} else {
			setUserBooks([])
			setTotalPrice(0)
		}
	}, [user])

	function onBuyClick() {
		show(null, 'Спасибо за покупку!')
	}

	return (
		<div className={'cart-page'}>
			<div className="row">
				<div className="col">
					<div className="block">
						<div className="block-title">
							<h2>Корзина</h2>
						</div>

						<div className="block-body">
							<p><strong>Книг в корзине:</strong> {userBooks.length}</p>
							<p><strong>Итоговая сумма: </strong> {totalPrice} &#8381;</p>
							<Button color={'primary'} icon={faShoppingCart} className={'cart-page__buy-btn'} onClick={onBuyClick}>Купить</Button>
							<div className="divider"/>
							<p className={'block__section-title'}><strong>Книги:</strong></p>
							<List
								items={userBooks}
								getKey={book => book.id}
								render={(book) => <CartPageItem user={user} book={book} />}
								className={'cart-page__list'}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartPage
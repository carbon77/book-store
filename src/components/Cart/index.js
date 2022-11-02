import React, { useEffect, useState } from 'react'
import './cart.sass'
import { useSelector } from 'react-redux'
import { selectBooks } from '../../store/book'
import { selectUser } from '../../store/user'
import Button from '../Button'
import List from '../List'
import CartItem from './CartItem'

function Cart({ isOpen, setIsOpen }) {
	const user = useSelector(selectUser)
	const allBooks = useSelector(selectBooks)
	const [userBooks, setUserBooks] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)

	useEffect(() => {
		if (user && user.cart && allBooks) {
			setTotalPrice(user.cart.reduce((previous, current) => {
				const book = allBooks.find(book => book.id === current)
				return previous + book.price
			}, 0))

			setUserBooks(allBooks.filter(book => user.cart.includes(book.id)))
		} else {
			setUserBooks([])
			setTotalPrice(0)
		}
	}, [user])

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	function onCartClick(e) {
		if (e.target.classList.contains('cart')) {
			setIsOpen(false)
		}
	}

	return (
		<div className={ `cart ${isOpen ? 'cart-open' : ''}` } onClick={onCartClick}>
			<div className="cart__container">
				<h2 className="cart__title">Корзина</h2>
				<div className="cart__books">
					<List
						getKey={book => book.id}
						items={userBooks}
						render={book => <CartItem user={user} book={book} />}
					/>
				</div>
				<p className="cart__price">Итого: { totalPrice }</p>
				<div className="cart__submit">
					<Button color={ 'primary' } className={ 'cart__submit-btn' }>Оформить</Button>
				</div>
			</div>
		</div>
	)
}

export default Cart
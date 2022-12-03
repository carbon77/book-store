import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeBookFromCart } from '../../../store/user'

function CartItem({ user, book, setIsCartOpen }) {
	const dispatch = useDispatch()

	async function onRemoveClick() {
		await dispatch(removeBookFromCart(user.id, book.id))
	}

	function onCoverClick() {
		setIsCartOpen(false)
	}

	return (
		<div className={ 'cart__item' }>
			<Link to={`/books/${book.id}`} onClick={onCoverClick}>
				<img src={ book.cover } alt="cover.webp" className={ 'cart__cover' }/>
			</Link>
			<div className="cart__item-body">
				<strong className="cart__item__name">{ book.name }</strong>
				<small className="cart__item__author"><strong>Автор:</strong> { book.author }</small>
				<small className="cart__item__price"><strong>Цена:</strong> { book.price }&#x20bd;</small>
			</div>
			<div className="cart__item-remove">
				<span className="cart__item-remove-btn" onClick={onRemoveClick}>
					<FontAwesomeIcon icon={ faTrashCan }/>
				</span>
			</div>
		</div>
	)
}

export default CartItem
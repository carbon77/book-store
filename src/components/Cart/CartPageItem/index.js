import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { removeBookFromCart } from '../../../store/user'

function CartPageItem({ user, book }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	async function onRemoveClick(e) {
		e.stopPropagation()
		await dispatch(removeBookFromCart(user.id, book.id))
	}

	function onItemClick() {
		navigate(`/books/${book.id}`)
	}

	return (
		<div className={ 'cart-page__item' } onClick={onItemClick}>
			<div className="cart-page__remove">
				<span className="cart-page__remove-btn" onClick={onRemoveClick}><FontAwesomeIcon icon={ faTrashCan }/></span>
			</div>
			<img src={ book.cover } alt="cover.webp" className={ 'cart-page__cover' }/>
			<div className="cart-page__info">
				<strong className="cart-page__name">{ book.name }</strong>
				<small className="cart-page__author">{ book.author }</small>
			</div>
		</div>
	)
}

export default CartPageItem
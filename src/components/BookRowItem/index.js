import { faBookmark, faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { addBookToCart, removeBookFromCart, selectUser } from '../../store/user'
import { show } from '../../utils/notify'
import Button from '../Button'

// Компонент для элемента компонента BookRow
function BookRowItem({ book, size }) {
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const [isAddedToCart, setIsAddedToCart] = useState(false)
	const [isAddedToBookmark, setIsAddedToBookmark] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (user && user.cart && user.cart.includes(book.id)) {
			setIsAddedToCart(true)
		} else {
			setIsAddedToCart(false)
		}
	}, [user])

	function onBookmarkClick(e) {
		e.stopPropagation()
		setIsAddedToBookmark(lastState => !lastState)
	}

	async function onBuyClick(e) {
		e.stopPropagation()
		setIsLoading(true)
		if (isAddedToCart) {
			await dispatch(removeBookFromCart(user.id, book.id))
			show({
				title: 'Книга удалена из корзины',
				icon: 'fa-solid fa-trash',
			})
		} else {
			await dispatch(addBookToCart(user.id, book.id))
			show({
				title: 'Книга добавлена в корзину',
				icon: 'fa-solid fa-cart-plus',
			})
		}
		setIsLoading(false)
	}

	return (
		<div
			onClick={ () => navigate(`books/${ book.id }`) }
			className={ `book-row__item ${ size ? size : '' }` }
		>
			<img src={ book.cover } alt={ 'cover.webp' }/>
			<strong className="book-row__item-name">{ book.name }</strong>
			<p className="book-row__item-author">{ book.author }</p>
			<p>{ book.price }&#8381;</p>
			<div className="book-row__item-btns">
				<Button
					onClick={ onBuyClick }
					icon={ isAddedToCart ? faCheck : faCartShopping }
					color={ isAddedToCart ? 'dark' : 'primary' }
					disabled={isLoading}
				>
					{ isAddedToCart ? 'Добавлено' : 'Купить' }
				</Button>
				<Button
					onClick={ onBookmarkClick }
					color={ isAddedToBookmark ? 'secondary' : 'dark' }
					icon={ faBookmark }
				/>
			</div>
		</div>
	)
}

export default BookRowItem
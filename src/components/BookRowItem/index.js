import { faBookmark, faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../Button'

function BookRowItem({ book, size }) {
	const navigate = useNavigate()
	const [isAddedToCart, setIsAddedToCart] = useState(false)
	const [isAddedToBookmark, setIsAddedToBookmark] = useState(false)

	function onBookmarkClick(e) {
		e.stopPropagation()
		setIsAddedToBookmark(lastState => !lastState)
	}

	function onBuyClick(e) {
		e.stopPropagation()
		setIsAddedToCart(lastState => !lastState)
	}

	return (
		<div
			onClick={ () => navigate(`/books/${ book.id }`) }
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
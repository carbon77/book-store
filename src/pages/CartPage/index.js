import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import CartPageItem from '../../components/Cart/CartPageItem'
import CartFilters from '../../components/CartFilters'
import Input from '../../components/Input'
import List from '../../components/List'
import { selectBooks } from '../../store/book'
import { removeBookFromCart, selectUser } from '../../store/user'
import { show } from '../../utils/notify'
import './cartPage.sass'

function CartPage() {
	const user = useSelector(selectUser)
	const allBooks = useSelector(selectBooks)
	const dispatch = useDispatch()
	const [books, setBooks] = useState([])
	const [shownBooks, setShownBooks] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [isFiltersShown, setIsFiltersShown] = useState(false)

	useEffect(() => {
		if (user && user.cart && allBooks) {
			setTotalPrice(user.cart.reduce((previous, current) => {
				const book = allBooks.find(book => book.id === current)
				return previous + book.price
			}, 0))

			setBooks(allBooks.filter(book => user.cart.includes(book.id)))
		} else {
			setBooks([])
			setShownBooks([])
			setTotalPrice(0)
		}
	}, [user])

	useEffect(() => {
		setShownBooks(books)
	}, [books])

	function onBuyClick() {
		show({
			title: 'Операция завершена',
			description: 'Спасибо за покупку!',
			icon: 'fa-solid fa-check',
		})
	}

	async function clearCart() {
		await Promise.all(books.map(book => dispatch(removeBookFromCart(user.id, book.id))))
	}

	return (
		<div className={ 'cart-page' }>
			<div className="row">
				<div className="col">
					<div className="block">
						<div className="block-title">
							<h2>Корзина</h2>
						</div>
						<div className="block-body">
							<p><strong>Книг в корзине:</strong> { books.length }</p>
							<p><strong>Итоговая сумма: </strong> { totalPrice } &#8381;</p>
							<Button color={ 'primary' } icon={ faShoppingCart } className={ 'cart-page__buy-btn' }
									onClick={ onBuyClick }>Купить</Button>
							<Button onClick={ clearCart } color={ 'dark' } icon={ faTrashAlt }>Очистить корзину</Button>
							<div className="divider"/>
							<div className="cart-block">
								<div className="cart-block__filters-toggle">
									<p className={ 'filters-toggle' }
									   onClick={ () => setIsFiltersShown(s => !s) }>
										Фильтры
										<FontAwesomeIcon
											icon={ `fa-solid ${isFiltersShown ? 'fa-chevron-up' : 'fa-chevron-down'}` }
										/>
									</p>
								</div>
								<CartFilters isFiltersShown={isFiltersShown} setShownBooks={setShownBooks} books={books} />
								<div className="cart-block__books">
									<List
										items={ shownBooks }
										getKey={ book => book.id }
										render={ (book) => <CartPageItem user={ user } book={ book }
																		 removable={ true }/> }
										className={ 'cart-page__list list-row wrap' }
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartPage
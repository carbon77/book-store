import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import CartPageItem from '../../components/Cart/CartPageItem'
import Input from '../../components/Input'
import List from '../../components/List'
import { selectBooks } from '../../store/book'
import { removeBookFromCart, selectUser } from '../../store/user'
import { show } from '../../utils/notify'
import './cartPage.sass'

function CartPage() {
	const user = useSelector(selectUser)
	const books = useSelector(selectBooks)
	const dispatch = useDispatch()
	const [userBooks, setUserBooks] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [isFiltersShown, setIsFiltersShown] = useState(false)

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
		show({
			title: 'Операция завершена',
			description: 'Спасибо за покупку!',
			icon: 'fa-solid fa-check',
		})
	}

	async function clearCart() {
		await Promise.all(userBooks.map(book => dispatch(removeBookFromCart(user.id, book.id))))
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
							<p><strong>Книг в корзине:</strong> { userBooks.length }</p>
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
								<div className={ `cart-block__filters ${ isFiltersShown ? '' : 'mobile-close' }` }>
									<div className="cart-filters__item">
										<small><strong>Поиск</strong></small>
										<Input placeholder={ 'Название, автор...' }/>
									</div>
									<div className="cart-filters__item">
										<small><strong>Цена, &#8381;</strong></small>
										<Input placeholder={ 'от' }/>
										<Input placeholder={ 'до' }/>
									</div>
									<div className="cart-filters__item sort">
										<small><strong>Сортировать по цене</strong></small>
										<div className="btns">
											<Button title={ 'По убыванию' } outline
													icon={ 'fa-arrow-down-wide-short' }/>
											<Button title={ 'По возврастанию' } outline
													icon={ 'fa-arrow-down-short-wide' }/>
										</div>
									</div>
								</div>
								<div className="cart-block__books">
									<List
										items={ userBooks }
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
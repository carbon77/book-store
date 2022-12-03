import { faBookmark, faCartShopping, faComment, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import List from '../../components/List'
import Loader from '../../components/Loader'
import Review from '../../components/Review'
import ReviewForm from '../../components/ReviewForm'
import { fetchBookById, fetchReviews, selectCurrentBook, selectReviews } from '../../store/book'
import { addBookToCart, removeBookFromCart, selectUser } from '../../store/user'
import { getDateString } from '../../utils/date'
import { show } from '../../utils/notify'
import './bookPage.sass'

// Компонент для страницы конкретной книги
function BookPage() {
	const { bookId } = useParams()
	const book = useSelector(selectCurrentBook)
	const reviews = useSelector(selectReviews)
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const [isBookLoading, setIsBookLoading] = useState(true)
	const [isReviewsLoading, setIsReviewsLoading] = useState(true)
	const [isAddedToCart, setIsAddedToCart] = useState(false)

	useEffect(() => {
		// Загрузка книги
		if (!book || bookId !== book.id) {
			dispatch(fetchBookById(bookId)).then(() => {
				setIsBookLoading(false)
			})
		} else {
			setIsBookLoading(false)
		}
	}, [book, bookId])

	useEffect(() => {
		// Загрузка отзывов
		if (!reviews?.length) {
			dispatch(fetchReviews()).then(() => {
				setIsReviewsLoading(false)
			})
		} else {
			setIsReviewsLoading(false)
		}
	}, [reviews])

	useEffect(() => {
		// Проверка авторизации пользователя
		if (user && user.cart && user.cart.includes(bookId)) {
			setIsAddedToCart(true)
		} else {
			setIsAddedToCart(false)
		}
	}, [user])

	if (isBookLoading)
		return <Loader/>

	async function onBuyClick() {
		await dispatch(addBookToCart(user.id, book.id))

		show({
			title: 'Книга добавлена в корзину',
			icon: 'fa-solid fa-cart-plus',
		})

	}

	async function onRemoveFromCartClick() {
		await dispatch(removeBookFromCart(user.id, book.id))
		show({
			title: 'Книга удалена из корзины',
			icon: 'fa-solid fa-trash',
		})
	}

	return (
		<div className={ 'book-page-container' }>
			<div className="row column">
				<div className="col">
					<div className="block">
						<div className="block-body">
							<div className="breadcrumb">
								<span className="breadcrumb__item"><Link to={ '/' }>Книги</Link></span>&nbsp;/&nbsp;
								<span className="breadcrumb__item">{ book.genre }</span>&nbsp;/&nbsp;
								<span className="breadcrumb__item">{ book.author }</span>&nbsp;/&nbsp;
								<span className="breadcrumb__item">
									<Link to={ `/books/${ book.id }` }>{ book.name }</Link>
								</span>
							</div>

							<div className="block-book__main">
								<img src={ book.cover } alt="cover.webp" className={ 'book-cover' }/>
								<div className="row column gap-0">
									<h3 className="book-title">{ book.name }</h3>
									<p className="book-author">Автор: <Link to={ '/' }>{ book.author }</Link></p>
									{ !book.achievements?.length ? null : (
										<div className="book-achievements">
											{ book.achievements.map((a, idx) => {
												if (a === 'Бестселлер')
													return <span key={ idx }
																 className={ 'badge primary' }>{ a }</span>
												return <span key={ idx } className={ 'badge dark' }>{ a }</span>
											}) }
										</div>
									) }
									<div className="book-rating-row">
											<span className="book-rating">
												{ book.rating }&nbsp;<FontAwesomeIcon icon={ faStar }/>
											</span>

										<span className="book-reviewCount">
												{ book.reviewCount }&nbsp;<FontAwesomeIcon icon={ faComment }/>
											</span>
									</div>
									<div className="book-info">
										<strong className={ 'book-info__title' }>Информация о книге:</strong>
										<div className="book-info__item">
											<strong>Жанр</strong>
											<strong>{ book.genre }</strong>
										</div>
										<div className="book-info__item">
											<strong>Возврастное ограничение</strong>
											<strong>{ book.age }+</strong>
										</div>
										<div className="book-info__item">
											<strong>Дата выхода</strong>
											<strong>{ getDateString(book.releaseDate) }</strong>
										</div>
										<div className="book-info__item">
											<strong>Объём</strong>
											<strong>{ book.volume } стр.</strong>
										</div>
									</div>

									{ !user ? <div>Нужно войти</div> : (
										<div className="book-buttons">
											{ isAddedToCart ? (
												<Button
													color={ 'dark' }
													onClick={ onRemoveFromCartClick }
												>В корзине</Button>
											) : (
												<Button
													color={ 'primary' }
													icon={ faCartShopping }
													onClick={ onBuyClick }
												>
													Купить { book.price }&#8381;
												</Button>
											) }


											<Button color={ 'dark' } icon={ faBookmark }>В закладки</Button>
										</div>
									) }
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="block">
						<div className="block-title">
							<h3>Описание</h3>
						</div>
						<div className="block-body">
							<p style={ { textIndent: '30px' } }>{ book.description }</p>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="block">
						<div className="block-title">
							<h3>Оставить отзыв</h3>
						</div>
						<div className="block-body">
							<ReviewForm/>
						</div>
					</div>
				</div>

				<div className="col">
					<div className="block">
						<div className="block-title">
							<h3>Отзывы</h3>
						</div>
						<div className="block-body">
							{ !book.reviewCount ? <p>На эту книгу ещё не оставили отзыв</p> : (
								<List
									items={ reviews.slice(0, book.reviewCount) }
									getKey={ review => review.id }
									render={ review => <Review review={ review }/> }
									className={ 'list-gap-2' }
								/>
							) }
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookPage
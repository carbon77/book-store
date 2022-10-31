import { faBookmark, faCartShopping, faComment, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import List from '../../components/List'
import Loader from '../../components/Loader'
import { fetchBookById, fetchReviews, selectCurrentBook, selectReviews } from '../../store/book'
import { getDateString } from '../../utils/date'
import './bookPage.sass'

function BookPage() {
	const { bookId } = useParams()
	const book = useSelector(selectCurrentBook)
	const reviews = useSelector(selectReviews)
	const dispatch = useDispatch()
	const [isBookLoading, setIsBookLoading] = useState(true)
	const [isReviewsLoading, setIsReviewsLoading] = useState(true)

	useEffect(() => {
		if (!book || bookId !== book.id) {
			dispatch(fetchBookById(bookId)).then(() => {
				setIsBookLoading(false)
			})
		} else {
			setIsBookLoading(false)
		}
	}, [book])

	useEffect(() => {
		if (!reviews?.length) {
			dispatch(fetchReviews()).then(() => {
				setIsReviewsLoading(false)
			})
		} else {
			setIsReviewsLoading(false)
		}
	}, [reviews])

	if (isBookLoading)
		return <Loader/>

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

							<div className="row">
								<div className="col w-50">
									<img src={ book.cover } alt="cover.webp" className={ 'book-cover' }/>
								</div>
								<div className="col">
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

										<div className="book-buttons">
											<Button
												color={ 'primary' }
												icon={ faCartShopping }
											>Купить { book.price }&#8381;</Button>
											<Button color={ 'dark' } icon={ faBookmark }>В закладки</Button>
										</div>
									</div>
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
							<h3>Отзывы</h3>
						</div>
						<div className="block-body">
							{ !book.reviewCount ? <p>На эту книгу ещё не оставили отзыв</p> : (
								<List
									items={ reviews.slice(0, book.reviewCount) }
									getKey={ review => review.id }
									gap={ 2 }
									render={ review => (
										<div className={ 'review' }>
											<img src={ review.avatar } alt="avatar" className="review__avatar"/>
											<div>
												<div className="review__header">
													<div>
														<strong className="review__author">{ review.author }</strong>
														<small
															className="review__creation-date">{ getDateString(review.creationDate) }</small>
													</div>
													<div className="review__rating">
														<span>{ review.rating }</span>&nbsp;<FontAwesomeIcon
														icon={ faStar }/>
													</div>
												</div>
												<div className="review__body">
													<p className="review__text">{ review.text }</p>
												</div>
												<div className="review__footer">
													<Button icon={ faThumbsUp }
															outline>Нравится: { review.likes }</Button>
												</div>
											</div>
										</div>
									) }
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
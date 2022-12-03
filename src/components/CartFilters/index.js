import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import Input from '../Input'

// Компонент блока фильтрации из страницы корзины
// стили находятся в pages/CartPage/cartPage.sass
export default function CartFilters({
										isFiltersShown,
										books,
										setShownBooks,
									}) {
	const genres = ['Программирование', 'Фантастика', 'Ужасы, мистика']
	const allGenre = 'Все'
	const [searchQuery, setSearchQuery] = useState('')
	const [fromPrice, setFromPrice] = useState(null)
	const [toPrice, setToPrice] = useState(null)
	const [sortType, setSortType] = useState('')
	const [checkedGenres, setCheckedGenres] = useState([allGenre])

	useEffect(() => {
		let newBooks = books
			.filter(book => book.name.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery))

		if (fromPrice) {
			newBooks = newBooks.filter(book => book.price >= fromPrice)
		}

		if (toPrice) {
			newBooks = newBooks.filter(book => book.price <= toPrice)
		}

		if (checkedGenres.length !== 0 && checkedGenres[0] !== allGenre) {
			newBooks = newBooks.filter(book => checkedGenres.includes(book.genre))
		}

		newBooks.sort((b1, b2) => {
			if (sortType === 'sort') {
				return b1.price - b2.price
			} else if (sortType === 'sort-desc') {
				return b2.price - b1.price
			}

			return 0
		})

		setShownBooks(newBooks)
	}, [searchQuery, fromPrice, toPrice, sortType, checkedGenres])

	function getPriceChangeListener(setPrice) {
		return ({ target }) => {
			const value = target.value

			setPrice(value === '' ? null : +value)
		}
	}

	function getSortButtonListener(value) {
		return e => {
			if (value === sortType) {
				setSortType('')
				return
			}

			setSortType(value)
		}
	}

	function getGenresListener(genre) {
		return e => {
			let newGenres

			if (checkedGenres.includes(genre)) {
				newGenres = checkedGenres.filter(g => g !== genre)
				if (newGenres.length === 0) {
					newGenres = [allGenre]
				}
			} else {
				if (genre === allGenre) {
					newGenres = [allGenre]
				} else {
					newGenres = [...checkedGenres.filter(g => g !== allGenre), genre]
				}
			}

			setCheckedGenres(newGenres)
		}
	}

	return (
		<div className={ `cart-block__filters ${ isFiltersShown ? '' : 'mobile-close' }` }>
			<div className="cart-filters__item">
				<small><strong>Поиск</strong></small>
				<Input value={ searchQuery }
					   onChange={ ({ target }) => setSearchQuery(target.value.toLowerCase()) }
					   placeholder={ 'Название, автор...' }/>
			</div>
			<div className="cart-filters__item">
				<small><strong>Цена, &#8381;</strong></small>
				<Input type={ 'number' } placeholder={ 'от' } value={ fromPrice ? fromPrice : '' }
					   onChange={ getPriceChangeListener(setFromPrice) }/>
				<Input type={ 'number' } placeholder={ 'до' } value={ toPrice ? toPrice : '' }
					   onChange={ getPriceChangeListener(setToPrice) }/>
			</div>
			<div className="cart-filters__item sort">
				<small><strong>Сортировать по цене</strong></small>
				<div className="btns">
					<Button title={ 'По убыванию' } outline={ sortType !== 'sort-desc' }
							icon={ 'fa-arrow-down-wide-short' } onClick={ getSortButtonListener('sort-desc') }/>
					<Button title={ 'По возврастанию' } outline={ sortType !== 'sort' }
							icon={ 'fa-arrow-down-short-wide' } onClick={ getSortButtonListener('sort') }/>
				</div>
			</div>
			<div className="cart-filters__item">
				<small><strong>Жанры</strong></small>
				<div className="cart-genres">
					<label className="cart-genres__item">
						<input checked={ checkedGenres.includes(allGenre) } onChange={ getGenresListener(allGenre) }
							   type="checkbox" name={ 'genre-filter' }
							   value={ allGenre } className={ 'cart-genres__input' }/>
						<div className="cart-genres__checkbox">
							<FontAwesomeIcon icon={ faCheck }/>
						</div>
						<span>{ allGenre }</span>
					</label>

					{ genres.map(genre => (
						<label key={ genre } className={ 'cart-genres__item' }>
							<input checked={ checkedGenres.includes(genre) } onChange={ getGenresListener(genre) }
								   type="checkbox" name={ 'genre-filter' }
								   value={ genre } className={ 'cart-genres__input' }/>
							<div className="cart-genres__checkbox">
								<FontAwesomeIcon icon={ faCheck }/>
							</div>
							<span>{ genre }</span>
						</label>
					)) }
				</div>
			</div>
		</div>
	)
}
import { faBook, faCartShopping, faList, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectUser } from '../../store/user'
import AuthModalBody from '../AuthModalBody'
import Loader from '../Loader'
import Modal from '../Modal'
import './header.sass'

function Header({ setIsCartOpen }) {
	const user = useSelector(selectUser)
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<>
			<header className={ 'header' }>
				<div className="header__main">

					<Link to={ '/' } className={ 'header__title' }><h1>Book<span>Store</span></h1></Link>

					<form className="header__search-form">
						<input type="search" name={ 'search_query' } placeholder={ 'Искать книгу, автора, жанр...' }/>
						<button type={ 'submit' }><FontAwesomeIcon icon={ faMagnifyingGlass }/></button>
					</form>

					<div className="header__nav">
						{ user
							? ( !user.name ? <Loader size={ 'small' }/> : <>
								<div className="header__nav-item user-item" onClick={ () => navigate('user') }>
									{ !user.avatarUrl ? null : (
										<img src={ user.avatarUrl } alt="avatar.jpg" className={ 'user-item__avatar' }/>
									) }

									<div className="user-item__info">
										<strong>{ user.name }</strong>
										<small>1000 руб.</small>
									</div>
								</div>
								<div className="header__nav-item" onClick={() => navigate("my-books")}>
									<FontAwesomeIcon icon={ faBook }/>Мои книги
								</div>
							</> )
							: (
								<div className="header__nav-item" onClick={ () => setIsModalOpen(mo => !mo) }>
									Войти
								</div>
							)
						}
						<div className="header__nav-item" onClick={() => setIsCartOpen(open => !open)}>
							<FontAwesomeIcon icon={ faCartShopping }/>
							{user?.cart ? user.cart.length : 0}
						</div>
					</div>
				</div>

				<div className="header__submenu">
					<span className="header__submenu-item header__submenu-item-books">
						<FontAwesomeIcon icon={ faList }/>Книги
					</span>

					<div className="sub-books">
						<div className="sub-books__items">
							<div className="sub-books__item row column">
								<span className="col sub-books__item-title">Легкое чтение</span>
								<span className="col">Фантастика</span>
								<span className="col">Фентези</span>
								<span className="col">Детективы</span>
								<span className="col">Боевики</span>
							</div>
							<div className="sub-books__item row column">
								<span className="col sub-books__item-title">Серьезное чтение</span>
								<span className="col">Современная проза</span>
								<span className="col">Классическая литература</span>
								<span className="col">Биографии и мемуары</span>
								<span className="col">Пьесы, драматургия</span>
							</div>
							<div className="sub-books__item row column">
								<span className="col sub-books__item-title">Знания и навыки</span>
								<span className="col">Бизнес-книги</span>
								<span className="col">Учебная и научная литература</span>
								<span className="col">Саморазвитие / личностный рост</span>
								<span className="col">Хобби, досуг</span>
							</div>
							<div className="sub-books__item row column">
								<span className="col sub-books__item-title">Бизнес-книги</span>
								<span className="col">Кадровый менеджмент</span>
								<span className="col">Личная эффективность</span>
								<span className="col">Зарубежная деловая литература</span>
								<span className="col">Менеджмент</span>
							</div>
							<div className="sub-books__item row column">
								<span className="col sub-books__item-title">История</span>
								<span className="col">Историческая литература</span>
								<span className="col">Биографии и мемуары</span>
								<span className="col">Популярно об истории</span>
								<span className="col">Документальная литература</span>
							</div>
							<div className="sub-books__item row column">
								<span className="col sub-books__item-title">Психология, мотивация</span>
								<span className="col">Книги по психологии</span>
								<span className="col">Саморазвитие / личностный рост</span>
								<span className="col">Биографии и мемуары</span>
								<span className="col">Истории из жизни</span>
							</div>
						</div>
					</div>

					<span className="header__submenu-item">Новинки</span>
					<span className="header__submenu-item">Рекомендации</span>
					<span className="header__submenu-item">Популярное</span>
					<span className="header__submenu-item">Аудиокниги</span>
				</div>
			</header>


			<Modal
				title={ 'Авторизация' }
				isOpen={ isModalOpen }
				setIsOpen={ setIsModalOpen }
			>
				<AuthModalBody setIsModalOpen={ setIsModalOpen }/>
			</Modal>
		</>
	)
}

export default Header
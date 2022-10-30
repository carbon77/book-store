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

function Header() {
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
								<div className="header__nav-item"><FontAwesomeIcon icon={ faBook }/></div>
							</> )
							: (
								<div className="header__nav-item" onClick={ () => setIsModalOpen(mo => !mo) }>
									Войти
								</div>
							)
						}
						<div className="header__nav-item"><FontAwesomeIcon icon={ faCartShopping }/></div>
					</div>
				</div>

				<div className="header__submenu">
					<span className="header__submenu-item">
						<FontAwesomeIcon icon={ faList }/>Книги
					</span>

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
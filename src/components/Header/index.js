import { faBook, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { selectUser } from '../../store/user'
import Modal from '../Modal'
import AuthModalBody from '../AuthModalBody'
import './header.sass'

function Header() {
	const user = useSelector(selectUser)
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<>
			<header className={ 'header' }>
				<Link to={ '/' } className={ 'header__title' }><h1>Book<span>Store</span></h1></Link>

				<form className="header__search-form">
					<input type="search" name={ 'search_query' } placeholder={ 'Искать книгу, автора, жанр...' }/>
					<button type={ 'submit' }><FontAwesomeIcon icon={ faMagnifyingGlass }/></button>
				</form>

				<div className="header__nav">
					{ user
						? ( <>
							<div className="header__nav-item" onClick={() => navigate("user")}>
								{ user.name }
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
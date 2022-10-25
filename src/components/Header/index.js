import { faBook, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../../store/auth'
import Modal from '../Modal'
import AuthModalBody from '../AuthModalBody'
import './header.sass'

function Header() {
	const user = useSelector(selectUser)
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
					<div className="header__nav-item" onClick={ () => setIsModalOpen(mo => !mo) }>
						{ user
							? <>Игорь Закатов</>
							: <>Авторизация</>
						}
					</div>
					<div className="header__nav-item"><FontAwesomeIcon icon={ faBook }/></div>
					<div className="header__nav-item"><FontAwesomeIcon icon={ faCartShopping }/></div>
				</div>
			</header>
			<Modal
				title={ 'Авторизация' }
				isOpen={ isModalOpen }
				setIsOpen={ setIsModalOpen }
			>
				<AuthModalBody />
			</Modal>
		</>
	)
}

export default Header
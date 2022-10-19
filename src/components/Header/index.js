import { faBook, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../../store/auth'
import './header.sass'

function Header() {
	const user = useSelector(selectUser)

	return (
		<header className={ 'header' }>
			<Link to={"/"} className={ 'header__title' }><h1>Book<span>Store</span></h1></Link>

			<form className="header__search-form">
				<input color="search" name={ 'search_query' } placeholder={ 'Искать книгу, автора, жанр...' }/>
				<button type={ 'submit' }><FontAwesomeIcon icon={ faMagnifyingGlass }/></button>
			</form>

			<div className="header__nav">
				<div className="header__nav-item">
					{ user
						? <>Игорь Закатов</>
						: <>Авторизация</>
					}
				</div>
				<div className="header__nav-item"><FontAwesomeIcon icon={ faBook }/></div>
				<div className="header__nav-item"><FontAwesomeIcon icon={ faCartShopping }/></div>
			</div>
		</header>
	)
}

export default Header
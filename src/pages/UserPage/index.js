import {
	faClockRotateLeft,
	faCreditCard,
	faDownload,
	faRightToBracket,
	faSignOut,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router'
import List from '../../components/List'
import Loader from '../../components/Loader'
import Modal from '../../components/Modal'
import { selectUser, signOut, uploadAvatar } from '../../store/user'
import './userPage.sass'

// Компоненты для страницы пользователя
function UserPage() {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const location = useLocation()
	const navigate = useNavigate()
	const [checkedItem, setCheckedItem] = useState(0)
	const [userInfoLoading, setUserInfoLoading] = useState(false)
	const [signOutModalOpen, setSignOutModalOpen] = useState(false)

	useEffect(() => {
		// Если пользователь переходит в /user, то его автоматически перебрасывает на /user/info
		if (location.pathname.endsWith('/user')) {
			return navigate('info')
		}
	}, [location])

	useEffect(() => {
		// Проверка авторизации пользователя, если не успешна, то перебрасывает на домашнюю страницу
		if (!user) {
			navigate('/')
		}
	}, [user])

	// Массив элементов внутреннего меню страницы
	const links = [
		{
			text: 'Основная информация',
			icon: faRightToBracket,
			path: 'info',
		},
		{
			text: 'Обо мне',
			icon: faUser,
			path: 'about_me',
		},
		{
			text: 'История операций',
			icon: faClockRotateLeft,
			path: 'history',
		},
		{
			text: 'Способы оплаты',
			icon: faCreditCard,
			path: 'payment',
		},
		{
			text: 'Выход',
			icon: faSignOut,
			onClick: e => {
				setSignOutModalOpen(true)
			},
		},
	]

	function onListItemClick(link, index) {
		if (link.onClick) {
			return link.onClick
		}

		return e => {
			setCheckedItem(index)
			navigate(`${ link.path }`)
		}
	}

	async function onChange(e) {
		const file = e.target.files[0]
		await dispatch(uploadAvatar(user.id, file))
	}

	if (!user)
		return <Loader />

	return ( <div className={ 'user-page-container' }>
		<div className="block block-user-info">
			<div className="block-body">
				<div className="row user-block">
					{ userInfoLoading ? <div className={ 'col' }><Loader/></div> : ( <>
						<div className="col w-auto">
							<div className="user-avatar">
								{ !user.avatarUrl ? null : (
									<img src={ user.avatarUrl } alt="avatar.jpg"/>
								) }
								<label
									htmlFor={ 'avatar-input' }
									className={ `user-avatar__button ${ user.avatarUrl ? null : 'show' }` }
								>
									<FontAwesomeIcon icon={ faDownload }/>
								</label>
								<input type="file" id={ 'avatar-input' } accept={ 'image/jpeg' }
									   onChange={ onChange }/>
							</div>
						</div>
						<div className="col">
							<div className="row column gap-0">
								<div className="col"><h1>{ user?.firstName }</h1></div>
								<div className="col">Баланс: 1000 &#8381;</div>
							</div>

						</div>
					</> ) }
				</div>
			</div>
		</div>
		<div className="block block-user-sidebar">
			<List
				items={ links }
				getKey={ (_, index) => index }
				render={ (link, index) => (
					<div
						className={ `list-link ${ index === checkedItem ? 'checked' : null }` }
						onClick={ onListItemClick(link, index) }
					>
						<FontAwesomeIcon icon={ link.icon } className={ 'list-link__icon' }/>
						{ link.text }
					</div>
				) }
			/>
		</div>
		<div className="block block-user-main">
			<Outlet/>
		</div>

		<Modal
			title={ 'Выход' }
			isOpen={ signOutModalOpen }
			setIsOpen={ setSignOutModalOpen }
			submitText={ 'Выйти' }
			onSubmit={ () => {
				dispatch(signOut())
				navigate('/')
			} }
			cancelText={ 'Отмена' }
			onCancel={ () => setSignOutModalOpen(false) }
		>
			<strong>Вы дейстиветельно хотите выйти?</strong>
		</Modal>
	</div> )
}

export default UserPage
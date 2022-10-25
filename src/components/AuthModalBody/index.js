import React, { useState } from 'react'
import '../Header/header.sass'
import './authModalBody.sass'
import SignInForm from '../SignInForm'
import SignUpForm from '../SignUpForm'

function AuthModalBody({ setIsModalOpen }) {
	const [tab, setTab] = useState('signIn')

	function changeTab(newTab) {
		return e => setTab(newTab)
	}

	return (
		<div className={ 'tabs' }>
			<div className="tabs-items">
				<div className={ `tabs-item ${ tab === 'signIn' ? 'checked' : null }` }
					 onClick={ changeTab('signIn') }>Авторизация
				</div>
				<div className={ `tabs-item ${ tab === 'signUp' ? 'checked' : null }` }
					 onClick={ changeTab('signUp') }>Регистрация
				</div>
			</div>
			<div className="tabs-body">
				{ tab === 'signIn'
					? <SignInForm onSubmit={() => setIsModalOpen(false)}/>
					: <SignUpForm onSubmit={() => setIsModalOpen(false)}/>
				}
			</div>

		</div>
	)
}

export default AuthModalBody
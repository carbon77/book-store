import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../store/user'
import Button from '../Button'
import Input from '../Input'

function SignInForm({ onSubmit: closeModal }) {
	const { handleSubmit, control } = useForm()
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()

	async function onSubmit(data) {
		setIsLoading(true)
		dispatch(login(data.email, data.password))
			.then(() => {
				setIsLoading(false)
				closeModal()
			})
	}

	return (
		<form onSubmit={ handleSubmit(onSubmit) } className={ 'form' }>
			<div className="form-field">
				<label htmlFor="email-input">Электронная почта</label>
				<Controller
					name={ 'email' }
					control={ control }
					render={
						({ field }) =>
							<Input placeholder={ 'Email' } { ...field } ref={ null } id={ 'email-input' }/>
					}
				/>
			</div>
			<div className="form-field">
				<label htmlFor="password-input">Пароль</label>
				<Controller
					name={ 'password' }
					control={ control }
					render={
						({ field }) =>
							<Input placeholder={ 'Password' } type={ 'password' } { ...field } ref={ null }
								   id={ 'password-input' }/>
					}
				/>
			</div>

			<Button type={ 'submit' } color={ 'primary' } disabled={ isLoading }>
				{ isLoading ? 'Вход...' : 'Войти' }
			</Button>
		</form>
	)
}

export default SignInForm
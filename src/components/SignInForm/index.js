import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../store/user'
import { show } from '../../utils/notify'
import Button from '../Button'
import Input from '../Input'

function SignInForm({ onSubmit: closeModal }) {
	const { handleSubmit, control, formState: { errors } } = useForm()
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()

	async function onSubmit(data) {
		setIsLoading(true)
		dispatch(login(data.email, data.password))
			.then(() => {
				setIsLoading(false)
				show({
					title: 'Авторизация успешна',
					description: 'Вы вошли в систему',
					icon: 'fa-solid fa-right-to-bracket',
				})
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
					rules={ {
						required: 'Это поле обязательное',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Не правильная электронная почта',
						},
					} }
					render={
						({ field }) =>
							<Input placeholder={ 'Электронная почта' } type={ 'email' } { ...field }
								   ref={ null }
								   id={ 'email-input' }/>
					}
				/>
				{ errors.email
					? <div className={ 'form-field__error' }>{ errors.email.message }</div>
					: null }
			</div>
			<div className="form-field">
				<label htmlFor="password-input">Пароль</label>
				<Controller
					name={ 'password' }
					control={ control }
					rules={ {
						required: 'Это поле обязательное',
					} }
					render={
						({ field }) =>
							<Input placeholder={ 'Пароль' } type={ 'password' } { ...field }
								   ref={ null }
								   id={ 'password-input' }/>
					}
				/>
				{ errors.password
					? <div className={ 'form-field__error' }>{ errors.password.message }</div>
					: null }
			</div>

			<Button type={ 'submit' } color={ 'primary' } disabled={ isLoading }>
				{ isLoading ? 'Вход...' : 'Войти' }
			</Button>
		</form>
	)
}

export default SignInForm
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createUser } from '../../store/user'
import { show } from '../../utils/notify'
import Button from '../Button'
import Input from '../Input'

function SignUpForm({ onSubmit: closeModal }) {
	const { control, handleSubmit, formState: { errors } } = useForm()
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)

	function onSubmit({ name, email, password }) {
		show({
			title: 'Регистрация недоступна',
			icon: 'fa-solid fa-ban',
		})
		// setIsLoading(true)
		// dispatch(createUser(name, email, password)).then(() => {
		// 	setIsLoading(false)
		// 	show({
		// 		title: 'Регистрация успешна',
		// 		description: 'Вы вошли в систему',
		// 		icon: 'fa-solid fa-right-to-bracket',
		// 	})
		// 	closeModal()
		// })
	}

	return (
		<form onSubmit={ handleSubmit(onSubmit) } className={ 'form' }>
			<div className="form-field">
				<label htmlFor="name-input">Имя</label>
				<Controller
					name={ 'name' }
					control={ control }
					rules={ {
						required: 'Это поле обязательное',
					} }
					render={ ({ field }) =>
						<Input placeholder={ 'Имя' } { ...field } ref={ null } id={ 'name-input' }/>
					}
				/>
				{ errors.name
					? <div className={ 'form-field__error' }>{ errors.name.message }</div>
					: null }
			</div>

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
					render={ ({ field }) =>
						<Input placeholder={ 'Электронная почта' } { ...field } ref={ null } id={ 'email-input' }/>
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
						minLength: {
							value: 6,
							message: 'Пароль должен быть больше шести символов',
						},
					} }
					render={ ({ field }) =>
						<Input placeholder={ 'Пароль' } { ...field } ref={ null } id={ 'password-input' }
							   type={ 'password' }/>
					}
				/>
				{ errors.password
					? <div className={ 'form-field__error' }>{ errors.password.message }</div>
					: null }
			</div>

			<Button type={ 'submit' } color={ 'primary' } disabled={ isLoading }>
				{ isLoading ? 'Создание...' : 'Создать аккаунт' }
			</Button>
		</form>
	)
}

export default SignUpForm
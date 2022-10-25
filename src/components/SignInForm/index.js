import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'

function SignInForm() {
	const { handleSubmit, control } = useForm()

	function onSubmit(data) {
		console.log(data)
	}

	return (
		<form onSubmit={ handleSubmit(onSubmit) } className={"form"}>
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

			<Button type={'submit'} color={'primary'}>Войти</Button>
		</form>
	)
}

export default SignInForm
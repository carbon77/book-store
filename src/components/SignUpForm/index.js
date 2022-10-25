import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'

function SignUpForm() {
	const { control, handleSubmit } = useForm()

	function onSubmit(data) {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={"form"}>
			<div className="form-field">
				<label htmlFor="name-input">Имя</label>
				<Controller
					name={ 'name' }
					control={ control }
					render={ ({ field }) =>
						<Input placeholder={ 'Имя' } { ...field } ref={ null } id={ 'name-input' }/>
					}
				/>
			</div>

			<div className="form-field">
				<label htmlFor="email-input">Электронная почта</label>
				<Controller
					name={ 'email' }
					control={ control }
					render={ ({ field }) =>
						<Input placeholder={ 'Электронная почта' } { ...field } ref={ null } id={ 'email-input' }/>
					}
				/>
			</div>

			<div className="form-field">
				<label htmlFor="password-input">Пароль</label>
				<Controller
					name={ 'password' }
					control={ control }
					render={ ({ field }) =>
						<Input placeholder={ 'Пароль' } { ...field } ref={ null } id={ 'password-input' }/>
					}
				/>
			</div>

			<Button type={'submit'} color={'primary'}>Создай аккаунт</Button>
		</form>
	)
}

export default SignUpForm
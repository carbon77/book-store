import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../../components/Input'
import Modal from '../../../components/Modal'
import { selectUser, updateUserInfo } from '../../../store/user'
import './userInfo.sass'
import { show } from '../../../utils/notify'

function UserInfo() {
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const [passwordModalOpen, setPasswordModalOpen] = useState(false)
	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			email: user.email,
		},
	})

	function onSubmit(data) {
		show(null, "Электронная почта успешно изменена")
	}

	return (
		<>
			<div className="block-title">
				<h2>Основная информация</h2>
			</div>

			<div className="block-body">
				<div className="row">
					<div className="col">
						<form>
							<div className="form-field">
								<label htmlFor="info-email-input">Электронная почта</label>
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
												   id={ 'info-email-input' }/>
									}
								/>
								{ errors.email
									? <div className={ 'form-field__error' }>{ errors.email.message }</div>
									: null }
							</div>
						</form>
					</div>

					<div className="col w-40 btn-icon-col">
						<div className="btn-icon" onClick={handleSubmit(onSubmit)}>
							<FontAwesomeIcon icon={ faEdit }/>
						</div>
					</div>
				</div>

				<div className="divider"/>

				<div className="row">
					<div className="col">
						<div className="form-field">
							<label htmlFor="phone-input">Мобильный телефон</label>
							<Input type={"tel"} id={"phone-input"} placeholder={"+7-999-999-99-99"}/>
						</div>
					</div>
					<div className="col w-40 d-flex jc-end ai-start">
						<div className="btn-icon" onClick={() => show(null, "Телефон успешно изменён")}>
							<FontAwesomeIcon icon={faEdit} />
						</div>
					</div>
				</div>

				<div className="divider"/>

				<div className="row">
					<div className="col d-flex ai-center">
						<h3>Изменить пароль</h3>
					</div>
					<div className="col w-40 btn-icon-col">
						<div className="btn-icon" onClick={() => setPasswordModalOpen(e => !e)}>
							<FontAwesomeIcon icon={faEdit} />
						</div>
					</div>
				</div>
			</div>

			<Modal
				isOpen={passwordModalOpen}
				setIsOpen={setPasswordModalOpen}
				title={"Изменение пароля"}
				onSubmit={() => show(null, "Пароль успешно изменён")}
				submitText={"Изменить"}
			>
				<form className={"form"}>
					<div className="form-field">
						<label htmlFor="old-password-change-input">Старый пароль</label>
						<Input type={"password"} id={"old-password-change-input"} placeholder={"Старый пароль"}/>
					</div>

					<div className="form-field">
						<label htmlFor="new-password-change-input">Новый пароль</label>
						<Input type={"password"} id={"new-password-change-input"} placeholder={"Новый пароль"}/>
					</div>

					<div className="form-field">
						<label htmlFor="password-confirm-change-input">Подтверждение пароля</label>
						<Input type={"password"} id={"password-confirm-change-input"} placeholder={"Подтверждение пароля"}/>
					</div>
				</form>
			</Modal>
		</>
	)
}

export default UserInfo
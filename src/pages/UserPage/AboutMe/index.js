import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../../components/Input'
import { selectUser } from '../../../store/user'
import { show } from '../../../utils/notify'

// Компонент для блока с информацией "О себе"
function AboutMe() {
	const user = useSelector(selectUser)
	const [firstName, setFirstName] = useState(user.firstName)
	const [secondName, setSecondName] = useState(user.lastName)

	return (
		<>
			<div className={ 'block-title' }><h2>Обо мне</h2></div>
			<div className="block-body">
				<div className="row">
					<div className="col">
						<div className="form-field">
							<label htmlFor="text-input">Имя</label>
							<Input type={ 'text' } id={ 'text-input' } value={ firstName }
								   onChange={ ({ target }) => setFirstName(target.value) }/>
						</div>
					</div>
					<div className="col w-40 d-flex jc-end ai-start">
						<div className="btn-icon"
							 onClick={ () => show({
								 title: 'Изменено',
								 description: `Фамилия изменена на ${ firstName }`,
								 icon: 'fa-solid fa-pencil',
							 }) }>
							<FontAwesomeIcon icon={ faEdit }/>
						</div>
					</div>
				</div>
				<div className="divider"/>
				<div className="row">
					<div className="col">
						<div className="form-field">
							<label htmlFor="secondName-input">Фамилия</label>
							<Input type={ 'text' } id={ 'secondName-input' } value={ secondName }
								   onChange={ ({ target }) => setSecondName(target.value) }/>
						</div>
					</div>
					<div className="col w-40 d-flex jc-end ai-start">
						<div className="btn-icon"
							 onClick={ () => show({
								 title: 'Изменено',
								 description: `Фамилия изменена на ${ secondName }`,
								 icon: 'fa-solid fa-pencil',
							 }) }>
							<FontAwesomeIcon icon={ faEdit }/>
						</div>
					</div>
				</div>
				<div className="divider"/>
			</div>
		</>
	)
}

export default AboutMe
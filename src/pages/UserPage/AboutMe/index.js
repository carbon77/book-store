import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../../../components/Input'
import { selectUser } from '../../../store/user'
import { show } from '../../../utils/notify'

function AboutMe() {
	const user = useSelector(selectUser)
	const [firstName, setFirstName] = useState(user.name)
	const [secondName, setSecondName] = useState('')

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
							 onClick={ () => show('Изменено', `Фамилия изменена на ${ firstName }`) }>
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
							 onClick={ () => show('Изменено', `Фамилия изменена на ${ secondName }`) }>
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
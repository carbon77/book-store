import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './input.sass'

function Input({ type = 'text', placeholder, icon, status, name, onBlur, onChange, id, value }) {
	return (
		<div className={ `input ${ status ? 'input-' + status : '' }` }>
			{ icon ? <FontAwesomeIcon icon={ icon } className={ 'input__icon' }/> : null }
			<input type={ type } placeholder={ placeholder } name={ name } onBlur={ onBlur } onChange={ onChange }
				   id={ id } value={value}/>
		</div>
	)
}

export default Input
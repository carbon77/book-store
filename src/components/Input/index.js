import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './input.sass'

// Компонент текстового поля
// icon - иконка текстового поля
// status - статус поля (error - ошибка)
function Input({ type = 'text', placeholder, icon, status, name, onBlur, onChange, id, value, className }) {
	return (
		<div className={ `input ${ status ? 'input-' + status : '' } ${className}`}>
			{ icon ? <FontAwesomeIcon icon={ icon } className={ 'input__icon' }/> : null }
			<input type={ type } placeholder={ placeholder } name={ name } onBlur={ onBlur } onChange={ onChange }
				   id={ id } value={value}/>
		</div>
	)
}

export default Input
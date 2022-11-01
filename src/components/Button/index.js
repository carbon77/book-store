import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './button.sass'

function Button({ children, color = 'primary', outline = false, icon, onClick, ...fields }) {
	return (
		<button
			className={ `btn btn-${ color } ${ outline ? `btn-${ color }-outline` : '' } ${!children ? 'icon' : ''}` }
			{...fields}
			onClick={onClick}
		>
			{ children }
			{ icon ? <FontAwesomeIcon icon={icon} className={'btn__icon'}/> : null }
		</button>
	)
}

export default Button
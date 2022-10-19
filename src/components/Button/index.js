import React from 'react'
import './button.sass'

function Button({ children, onCLick, color = 'primary', outline = false, submit = false }) {
	return (
		<button
			className={ `btn btn-${ color } ${ outline ? `btn-${ color }-outline` : '' }` }
			onClick={ onCLick }
			type={ submit ? 'submit' : 'button' }
		>{ children }</button>
	)
}

export default Button
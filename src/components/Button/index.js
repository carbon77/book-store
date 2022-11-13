import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './button.sass'

// Компонент кнопки
// Параметры:
// children - внутренние элементы кнопки
// color - цвет кнопки (primary, danger, dark, secondary)
// outline - меняет стиль кнопки
// icon - иконка кнопки
// onClick - функция при клике
// className - css классы
// fields - остальные аттрибуты кнопки
function Button({ children, className, color = 'primary',
					outline = false, icon, onClick, ...fields }) {
	return (
		<button
			className={ `btn btn-${ color } ${ outline ? `btn-${ color }-outline` : '' } 
			${!children ? 'icon' : ''} ${className}` }
			{...fields}
			onClick={onClick}
		>
			{ children }
			{ icon ? <FontAwesomeIcon icon={icon} className={'btn__icon'}/> : null }
		</button>
	)
}

export default Button
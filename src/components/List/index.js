import React from 'react'
import './list.sass'

function List({ className, items, render, getKey, gap }) {
	return (
		<div className={ `list ${ gap ? 'list-gap-' + gap : '' } ${className || ''}` }>
			{ items.map((item, index) => (
				<div className={ 'list-item' } key={ getKey(item, index) }>{ render(item, index) }</div>
			)) }
		</div>
	)
}

export default List
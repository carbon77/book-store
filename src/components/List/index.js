import React from 'react'
import './list.sass'

function List({ className, items, render, getKey }) {
	return (
		<div className={ `list ${className || ""}` }>
			{ items.map((item, index) => (
				<div className={ 'list-item' } key={ getKey(item, index) }>{ render(item, index) }</div>
			)) }
		</div>
	)
}

export default List
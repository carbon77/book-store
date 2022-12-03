import React from 'react'
import './list.sass'

// Компонент для отрисовки массива
// items - массив
// render - функция для отрисовки элемента массива - принимает элемент, возвращает компонент
// getKey - функция возвращающая ключ элемента для react
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
import './list.sass'

function List({ items, render, getKey, gap }) {
	return (
		<div className={ `list ${gap ? 'list-gap-' + gap : ''}` }>
			{ items.map((item, index) => (
				<div className={ 'list-item' } key={ getKey(item, index) }>{ render(item, index) }</div>
			)) }
		</div>
	)
}

export default List
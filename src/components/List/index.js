import './list.sass'

function List({ items, render, getKey }) {

	return (
		<div className={ 'list' }>
			{ items.map((item, index) => (
				<div className={ 'list-item' } key={ getKey(item, index) }>{ render(item, index) }</div>
			)) }
		</div>
	)
}

export default List
import React from 'react'
import BookRowItem from '../BookRowItem'
import './bookRow.sass'

// Компонент для строки книг в домашней странице
// при size == 'large' первый элемент выделен
function BookRow({ books, size }) {
	return (
		<div className={ `book-row ${ size ? size : '' }` }>
			{ size === 'large' ? (
				<BookRowItem book={ books[0] } size={ 'large' }/>
			) : null }

			<div className="book-row__items">
				{ books.slice(size === 'large' ? 1 : 0).map(book => (
					<BookRowItem book={ book } key={ book.id }/>
				)) }
			</div>
		</div>
	)
}

export default BookRow
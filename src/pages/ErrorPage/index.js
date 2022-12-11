import React from 'react'
import "./errorPage.sass"
import { useRouteError } from 'react-router'
import { Link } from 'react-router-dom'

function ErrorPage() {
	const error = useRouteError()

	return (
		<div className={'error-page'}>
			<h1>Упс!</h1>
			<p>Произошла ошибка. <i>{error.statusText}</i></p>
			<Link to={'/'}>Вернуться на сайт</Link>
		</div>
	)
}

export default ErrorPage
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/user'
import { show } from '../../utils/notify'
import Button from '../Button'
import './review-form.sass'

function ReviewForm() {
	const user = useSelector(selectUser)
	const [rating, setRating] = useState(0)
	const [text, setText] = useState('')

	if (!user || !user.name) {
		return (
			<p>Войдите, чтобы оставить отзыв</p>
		)
	}

	function onSubmit(e) {
		e.preventDefault()
		show(null, `Спасибо за отзыв! Оценка: ${ rating }`)
	}

	return (
		<form className={ 'review-form' } onSubmit={ onSubmit }>
			<img src={ user.avatarUrl } alt="avatar" className="review-form__avatar"/>
			<div className="review-form__body">
				<strong className={ 'review-form__name' }>{ user.name }</strong>
				<div className="review-form__rating">
					<span>Оцените книгу:</span>
					<div className="stars">
						{[...Array(5).keys()].reverse().map(i => (
							<FontAwesomeIcon
								icon={ faStar }
								className={ `star ${ rating >= i + 1 ? 'checked' : '' }` }
								onClick={ () => setRating(i + 1) }
							/>
						))}
					</div>
				</div>
				<textarea
					className="review-form__input"
					placeholder={ 'Что думаете о книге?' }
					value={ text }
					onChange={ e => setText(e.target.value) }
				/>
				<Button className={ 'review-form__submit' } type={ 'submit' }>Опубликовать</Button>
			</div>
		</form>
	)
}

export default ReviewForm
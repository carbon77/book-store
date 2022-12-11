import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getDateString } from '../../utils/date'
import Button from '../Button'

// Компонент отзыва на книгу
function Review({ review }) {
	return (
		<div className={ 'review' }>
			<img src={ review.userAvatar } alt="avatar" className="review__avatar"/>
			<div className={'review__content'}>
				<div className="review__header">
					<div>
						<strong className="review__author">{ review.user }</strong>
						<small
							className="review__creation-date">{ getDateString(review.creationDate) }</small>
					</div>
					<div className="review__rating">
						<span>{ review.rating }</span>&nbsp;<FontAwesomeIcon
						icon={ faStar }/>
					</div>
				</div>
				<div className="review__body">
					<p className="review__text">{ review.text }</p>
				</div>
				<div className="review__footer">
					<Button icon={ faThumbsUp }
							className={"like-btn"}
							outline>{ review.likes }</Button>
				</div>
			</div>
		</div>
	)
}

export default Review
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import './modal.sass'
import Button from '../Button'

function Modal({ title, children, isOpen, setIsOpen, onSubmit, onCancel, cancelText, submitText, form }) {
	function onModalClick(e) {
		if (e.target.classList.contains('modal')) {
			setIsOpen(open => !open)
		}
	}

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto'
	}, [isOpen])

	return (
		<div className={ `modal ${ isOpen ? '' : 'modal-close' }` } onClick={ onModalClick }>
			<div className="modal__content">
				<div className="modal__header">
					<strong className="modal__title">
						{ title }
					</strong>
					<FontAwesomeIcon icon={ faXmark }
									 className={ 'modal__close' }
									 onClick={ () => setIsOpen(open => !open) }/>
				</div>
				<div className={ `modal__body ${onSubmit || onCancel ? null : 'modal__body-no-footer'}` }>
					{ children }
				</div>
				{ onSubmit || onCancel
					? <div className={ 'modal__footer' }>
						{ onCancel ? <Button onClick={ onCancel } color={ 'secondary' }>{ cancelText }</Button> : null }
						{ onSubmit ? <Button
							onClick={ () => {
								setIsOpen(false)
								onSubmit()
							} }
							color={ 'primary' }
							type={ 'submit' }
							form={ form }
						>
							{ submitText }
						</Button> : null }
					</div>
					: null
				}
			</div>
		</div>
	)
}

export default Modal
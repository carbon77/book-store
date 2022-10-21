import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './modal.sass'
import Button from '../Button'

function Modal({ title, children, isOpen, setIsOpen, onSubmit, onCancel, cancelText, submitText }) {
	function onModalClick(e) {
		if (e.target.classList.contains('modal')) {
			setIsOpen(open => !open)
		}
	}

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
				<div className="modal__body">
					{ children }
				</div>
				{ onSubmit || onCancel
					? <div className={ 'modal__footer' }>
						<Button onCLick={ onCancel } color={ 'secondary' }>{ cancelText }</Button>
						<Button onCLick={ onSubmit } color={ 'primary' }>{ submitText }</Button>
					</div>
					: null
				}
			</div>
		</div>
	)
}

export default Modal
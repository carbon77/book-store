// Структура элемента уведомления
//
// <div class="notification">
// 	<div class="notification__icon">
// 		<i class="fa-regular fa-bell"></i>
// 	</div>
// 	<div class="notification__body">
// 		<h5 class="notification__title"></h4>
// 		<p class="notification__desc"></p>
// 	</div>
// 	<div class="notification__remove">
// 		<i class="fa-solid fa-xmark"></i>
// 	</div>
//  <div class="progress-bar></div>
// </div>

function onRemoveClick(e) {
	if (e.target?.classList.contains('notification__remove-btn')) {
		e.target.parentElement.parentElement.classList.add('close')

		if (!notificationContainer.hasChildNodes()) {
			notificationContainer.classList.add('empty')
		}
	}
}

let notificationContainer = document.getElementById('notification-container')
if (!notificationContainer) {
	notificationContainer = document.createElement('div')
	notificationContainer.id = 'notification-container'
	notificationContainer.classList.add('empty')
	document.body.appendChild(notificationContainer)
}
notificationContainer.addEventListener('click', onRemoveClick)

export function show({
						 title, description, delay: duration = 3000, icon = 'fa-regular fa-bell',
					 }) {
	const notificationContainer = document.getElementById('notification-container')
	notificationContainer.classList.remove('empty')

	const notification = document.createElement('div')
	notification.classList.add('notification', 'close')

	// Progress bar initialization
	const start = Date.now()
	const progressBar = document.createElement('div')
	progressBar.style.transitionDuration = duration + 'ms'
	setTimeout(() => {
		progressBar.style.width = '0'
	})
	progressBar.classList.add('progress-bar')
	notification.appendChild(progressBar)

	// Other elements
	const nIcon = document.createElement('div')
	nIcon.classList.add('notification__icon')
	nIcon.innerHTML = `<i class="${ icon } icon"/>`
	notification.appendChild(nIcon)

	const nBody = document.createElement('div')
	nBody.classList.add('notification__body')
	notification.appendChild(nBody)

	if (title) {
		const nTitle = document.createElement('h4')
		nTitle.classList.add('notification__title')
		nTitle.textContent = title
		nBody.appendChild(nTitle)
	}

	if (description) {
		const nDesc = document.createElement('p')
		nDesc.classList.add('notification__desc')
		nDesc.textContent = description
		nBody.appendChild(nDesc)
	}

	const nRemove = document.createElement('div')
	nRemove.classList.add('notification__remove')
	const removeBtn = document.createElement('button')
	removeBtn.classList.add('notification__remove-btn')
	removeBtn.innerHTML = '<i class="fa-solid fa-xmark"/>'

	nRemove.appendChild(removeBtn)
	notification.appendChild(nRemove)

	notificationContainer.prepend(notification)

	setTimeout(() => {
		notification.classList.remove('close')
	}, 10)

	setTimeout(() => {
		notification.classList.add('close')
	}, duration)

	notification.addEventListener('transitionend', e => {
		if (e.propertyName === 'opacity' && e.currentTarget.classList.contains('close')) {
			notification.remove()

			if (!notificationContainer.hasChildNodes()) {
				notificationContainer.classList.add('empty')
			}
		}
	})
}
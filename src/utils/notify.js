export function show(title, description) {
	let notificationContainer = document.getElementById("notification-container")

	const notification = document.createElement("div")
	notification.classList.add("notification", "notification-open")

	if (title) {
		const nTitle = document.createElement("div")
		nTitle.classList.add("notification__title")
		nTitle.textContent = title
		notification.appendChild(nTitle)
	}

	if (description) {
		const nBody = document.createElement("div")
		nBody.classList.add("notification__body")
		nBody.textContent = description
		notification.appendChild(nBody)
	}

	notificationContainer.prepend(notification)

	setTimeout(() => {
		notification.classList.remove("notification-open")
	}, 10)

	setTimeout(() => {
		notification.classList.add("notification-close")
	}, 2000)

	setTimeout(() => {
		notificationContainer.removeChild(notification)
	}, 2300)
}
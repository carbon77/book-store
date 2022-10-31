export function getDateString(seconds) {
	let date = new Date()
	date.setTime(seconds * 1000)
	return date.toLocaleDateString('ru', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}
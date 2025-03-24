setInterval(() => {
	document.querySelector(
		'#data'
	).innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
}, 1000)

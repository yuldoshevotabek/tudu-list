const input = document.querySelector('input'),
	btn = document.querySelector('.btn'),
	ul = document.querySelector('#ulli'),
	rejim = document.querySelector('.rejim'),
	body = document.querySelector('body')
window.result = false
rejim.addEventListener('click', function () {
	if (!result) {
		rejim.innerHTML = "<i style='color: yellow;' class='fa-solid fa-sun'></i>"
		document.documentElement.style.setProperty('--black', '#FFFFFF')
		document.documentElement.style.setProperty('--white', '#000000')
	} else {
		rejim.innerHTML = "<i style='color: red;' class='fa-solid fa-moon'></i>"
		document.documentElement.style.setProperty('--white', '#FFFFFF')
		document.documentElement.style.setProperty('--black', '#000000')
	}
	result = !result
})

function yuqori() {
	const li = document.createElement('li')
	li.classList.add('licha')
	li.innerHTML = `<button id='tayyor'><i class="fa-solid fa-check"></i></button>${input.value}<button id='tugma'><i class="fa-solid fa-xmark"></i></button>`
	ul.prepend(li)
	const tayyor = li.querySelectorAll('#tayyor')
	const tugma = li.querySelectorAll('#tugma')
	tugma.forEach(item => {
		item.addEventListener('click', () => {
			item.parentElement.remove()
		})
	})
	var res = false
	tayyor.forEach(item => {
		item.addEventListener('click', () => {
			if (!res) {
				item.parentElement.classList.add('line-through')
			} else {
				item.parentElement.classList.remove('line-through')
			}
			res = !res
		})
	})
	if (input.value == '') {
		alert('Text kiriting!!!')
		const li = document.querySelector('.licha')
		li.remove()
	}
	input.value = ''
}
btn.addEventListener('click', yuqori)
input.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		if (input.value === '') {
			alert('Text kiriting!!!')
			btn = false
		}
		btn.click()
	}
})

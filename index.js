const input = document.querySelector('input'),
	btn = document.querySelector('.btn'),
	ul = document.querySelector('#ulli'),
	rejim = document.querySelector('.rejim'),
	body = document.querySelector('body')
window.result = false

// Tungi va kunduzgi rejim
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

// Saqlangan ma'lumotlarni olish
window.onload = function () {
	const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
	savedTasks.forEach(task => addTaskToDOM(task.text, task.completed))
}

// DOM ga task qo'shish
function addTaskToDOM(taskText, isCompleted = false) {
	const li = document.createElement('li')
	li.classList.add('licha')
	if (isCompleted) li.classList.add('line-through') // Tugallangan tasklar uchun

	li.innerHTML = `
		<button id='tayyor'><i class="fa-solid fa-check"></i></button>
		${taskText}
		<button id='tugma'><i class="fa-solid fa-xmark"></i></button>
	`

	ul.prepend(li)

	const tayyor = li.querySelector('#tayyor')
	const tugma = li.querySelector('#tugma')

	// Taskni o'chirish
	tugma.addEventListener('click', () => {
		li.remove()
		removeTaskFromLocalStorage(taskText)
	})

	// Taskni tugallangan yoki tugallanmagan qilib belgilash
	tayyor.addEventListener('click', () => {
		li.classList.toggle('line-through')
		updateTaskStatusInLocalStorage(
			taskText,
			li.classList.contains('line-through')
		)
	})
}

// Taskni Local Storage'ga saqlash
function saveTaskToLocalStorage(taskText) {
	const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
	savedTasks.push({ text: taskText, completed: false })
	localStorage.setItem('tasks', JSON.stringify(savedTasks))
}

// Taskni Local Storage'dan o'chirish
function removeTaskFromLocalStorage(taskText) {
	let savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
	savedTasks = savedTasks.filter(task => task.text !== taskText)
	localStorage.setItem('tasks', JSON.stringify(savedTasks))
}

// Task statusini yangilash (tugallangan yoki yo'q)
function updateTaskStatusInLocalStorage(taskText, isCompleted) {
	const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
	savedTasks.forEach(task => {
		if (task.text === taskText) task.completed = isCompleted
	})
	localStorage.setItem('tasks', JSON.stringify(savedTasks))
}

// Task qo'shish
function yuqori() {
	const taskText = input.value.trim()
	if (taskText === '') {
		alert('Text kiriting!!!')
		return
	}

	addTaskToDOM(taskText)
	saveTaskToLocalStorage(taskText)
	input.value = '' // Inputni tozalash
}

// Enter tugmasi bilan task qo'shish
btn.addEventListener('click', yuqori)
input.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		yuqori()
	}
})

// Barcha tasklarni tozalash
const cler = document.querySelector('#cler')
cler.addEventListener('click', function () {
	localStorage.removeItem('tasks') // Local Storage'dan o'chirish
	const li = document.querySelectorAll('.licha')
	li.forEach(item => item.remove())
})

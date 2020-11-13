// Real cursor element

const root = document.querySelector('html')

const cursor = document.createElement('div')
cursor.classList.add('cursor')
root.appendChild(cursor)

var timer;


root.addEventListener('mousemove', (e) => {
	cursor.classList.add('moving')
	setPosition(cursor, e)
	clearTimeout(timer);
    timer=setTimeout(mouseStopped, 1500);   
})

function mouseStopped() {
	cursor.classList.remove('moving');
}

function setPosition(element, e) {
	element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
}


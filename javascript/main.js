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


function openPost(url) {
	$('#postframe').attr('src', '/images/posts/'+url+'/post.html');
	$('.cursor').fadeOut();
	setTimeout(function() {
		$('#postModal').css('animation-name', 'postModalopen');
		$('#postModal').css('top', '0%');
	},200);
	$('#block-main').css('animation-name', 'postModalopenbg');
	$('#block-main').css('opacity', '0');
  }

function closePost() {
	$('.cursor').fadeIn();
	$('#postModal').css('animation-name', 'postModalclose');
	$('#postModal').css('top', '100%');
	$('#block-main').css('animation-name', 'postModalclosebg');
	$('#block-main').css('opacity', '1');
  }


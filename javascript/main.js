// Real cursor element

// const root = document.querySelector('html')

// const cursor = document.createElement('div')
// cursor.classList.add('cursor')
// root.appendChild(cursor)

// var timer;

// root.addEventListener('mousemove', (e) => {
// 	cursor.classList.add('moving')
// 	setPosition(cursor, e)
// 	clearTimeout(timer);
//     timer=setTimeout(mouseStopped, 1500);   
// })

// function mouseStopped() {
// 	cursor.classList.remove('moving');
// }

// function setPosition(element, e) {
// 	element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
// }


function openPost(url) {
	$('#postframe').attr('onload', 'upPost(this)');
	$('#postframe').attr('src', '/images/posts/'+url+'/post.html');

	// $('#postModal').css('animation-name', 'postModalopen');
	// $('#postModal').css('top', '0%');

	// $('#block-main').css('animation-name', 'postModalopenbg');
	// $('#block-main').css('opacity', '0');

	// $('#gallery-pagination').css('display', 'none');
	
	// $('#btn-close').css('display', 'inline-block');

	// console.log(url + ' post opened');
  }

  function upPost() {
	$('#postModal').css('animation-name', 'postModalopen');
	$('#postModal').css('top', '0%');

	$('#block-main').css('animation-name', 'postModalopenbg');
	$('#block-main').css('opacity', '0');

	$('#gallery-pagination').css('display', 'none');
	
	$('#btn-close').css('display', 'inline-block');

	console.log('post opened');
  }

function closePost() {
	$('#postModal').css('animation-name', 'postModalclose');
	$('#postModal').css('top', '100%');

	$('#block-main').css('animation-name', 'postModalclosebg');
	$('#block-main').css('opacity', '1');

	$('#gallery-pagination').css('display', 'flex');

	$('#btn-close').css('display', 'none');

	// setTimeout(function(){
	// 	$('#postframe').attr('src', ' ');
	// },200);

	console.log('post closed');
  }


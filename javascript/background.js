var $overlay_load = $('#overlay-load');

var count = 1,
allocations = new Array(1, 2, 3, 6, 9, 8, 7, 4),
animate = setInterval(function () {
        $("#loader b").css("background", "white");
        $("#loader b:nth-child(" + allocations[count] + ")").css(
			"background",
			"black"
        );
        count++;
        if (count == 8) {
			count = 1;
		}
	}, 150);

$(function(){
	includeLayout();
}); 

function includeLayout(){ 
	var includeArea = $('[data-include]'); 
	var self, url; 
	$.each(includeArea, function() { 
		self = $(this); 
		url = self.data("include"); 
		self.load(url, function() { 
			self.removeAttr("data-include"); 
		}); 
	}); 
	
	completeLoad();
}

function completeLoad() {
	setTimeout(function(){
		$overlay_load.fadeOut('slow');
	}, 1500);
}


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
// // Real cursor element

// const root = document.querySelector('html')

// var $cursor = $('.cursor');
// var xp; 
// var yp;

// root.addEventListener('mousemove', (e) => {
// 	setPosition($cursor, e)
// })

// function setPosition(element, e) {
// 	setInterval(function(){
// 		// change 12 to alter damping higher is slower
// 		xp += ((e.clientX - xp)/6);
// 		yp += ((e.clientY - yp)/6);
// 		$cursor.css("transform", "translate3d(" + xp + "px," + yp + "px, 0)");
// 		// element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
// 	}, 30);
// }


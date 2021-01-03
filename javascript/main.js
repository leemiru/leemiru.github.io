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
  $("#postframe").attr("onload", "upPost(this)");
  $("#postframe").attr("src", "/images/posts/" + url + "/post.html");
}

function upPost() {
  $("#postModal").css("animation-name", "postModalopen");
  $("#postModal").css("top", "0%");

  $("#block-main").css("animation-name", "postModalopenbg");
  $("#block-main").css("opacity", "0");

  $("#gallery-pagination").css("display", "none");

  $("#btn-close").css("display", "inline-block");

  console.log("post opened");
}

function closePost() {
  $("#postModal").css("animation-name", "postModalclose");
  $("#postModal").css("top", "100%");

  $("#block-main").css("animation-name", "postModalclosebg");
  $("#block-main").css("opacity", "1");

  $("#gallery-pagination").css("display", "flex");

  $("#btn-close").css("display", "none");

  // setTimeout(function(){
  // 	$('#postframe').attr('src', ' ');
  // },200);

  console.log("post closed");
}

$(window).scroll(function () {
  var $height = $(window).scrollTop();
  var $body = $(".body").height();
  var result = ($body / $height) * 100;
  var deg = (360 / result) * 100;

  if (deg < 0) {
    deg == 0;
  } else if (deg > 360) {
    deg == 360;
  }

  if ($height < 0) {
    deg == 0;
  }

  $('#swiper-gallery').css('transform', 'translateY(' + $height/1.75 + 'px)');
  $('#swiper-gallery').css('opacity', (100 - $height/10) + '%');

  //header는 스크롤을 바닥에 닿자마자 반전
  if ($height > $body - 30) {
	$(".header").css("filter", "invert(1)");
	$("#gallery-pagination").css("display", "none");
  } else {
	$(".header").css("filter", "invert(0)");
	$("#gallery-pagination").css("display", "flex");
  }

  ////footer는 스크롤을 시작하자마자 반전
  if ($height > 60) {
    $(".footer").css("filter", "invert(1)");
  } else {
    $(".footer").css("filter", "invert(0)");
  }

  $("#main-logo-image").css("transform", "rotateX(" + deg + "deg)");
});

function gotoIntro() {
  $("html, body").animate(
    { scrollTop: $("#intro-contents").offset().top }, 500);
}

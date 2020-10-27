var $overlay_load = $('#overlay-load');
var $hamburger = $('.hamburger');
var $logo = $('#main-logo-image');
var $notice = $('.single-notice');
var $menu = $('#menu-overlay');
var $header = $('#main-header');

// $(function(){
// 	includeLayout();
// }); 

// function includeLayout(){ 
// 	var includeArea = $('[data-include]'); 
// 	var self, url; 
// 	$.each(includeArea, function() { 
// 		self = $(this); 
// 		url = self.data("include"); 
// 		self.load(url, function() { 
// 			self.removeAttr("data-include"); 
// 		}); 
// 	}); 
	
// 	completeLoad();
// }

// function completeLoad() {
// 	$overlay_load.fadeOut('fast');
// }

function resetHeader() {
	$logo.css('width', '48px');
	$hamburger.css('margin-right', '30px');
	$hamburger.css('margin-top', '-8px');
	$hamburger.css('transform', 'scale(0.8)');
}

function movetoGlance(seq){
     var offset = $("#glance-" + seq).offset();
     $('html, body').animate({scrollTop : offset.top}, 500);
  }
  
function moveTop(){
     $('html, body').animate({scrollTop : 0}, 500);
  }

//메뉴 버튼을 눌렀을 때 처리
var menu = 0;
// $hamburger.click(function(e) {
// 	e.currentTarget.classList.toggle('is-active');
// 	if (menu == 0) {
// 		showMenu();
// 	} else if (menu == 1) {
// 		hideMenu();
// 	}
// })
function toggleMenu(e) {
	if (menu == 0) {
		showMenu();
	} else if (menu == 1) {
		hideMenu();
	}
}

function showMenu() {
	$hamburger.toggleClass('is-active');
	$menu.css('display', 'block');
		setTimeout(function(){
			$menu.css('opacity', '1');
			$menu.css('z-index', '2');
			//$('#main-logo').css('filter', 'invert(1)');
			$header.css('background', 'none');
			//scroll하면서 작아진 놈들을 원래대로 돌려놓자.
			resetHeader();
		}, 1);
		menu = 1;
}

function hideMenu() {
	$hamburger.toggleClass('is-active');
	$menu.css('opacity', '0');
	$menu.css('z-index', '0');
	//$('#main-logo').css('filter', 'invert(0)');
	$header.css('background', 'linear-gradient(180deg, rgba(50, 50, 50, 0.485), rgba(50, 50, 50, 0))');
	setTimeout(function(){
		$menu.css('display', 'none');
	}, 150);
	menu = 0;
	// $hamburger.classList.removeClass('is-active');
}


//복무일수 구하는 부분
var ddaytimer = setInterval (dayGap, 1000)
var countMax = 0;
function dayGap () {
       //디데이 구하기
		 var dday = new Date("November 20, 2020 00:00:00");//디데이
       var ddayChange = dday.getTime();
       var nowday = new Date();//현재
       nowday = nowday.getTime();//밀리세컨드 단위변환
       var distance = ddayChange - nowday;//디데이에서 현재까지 뺀다.
     
       var d = Math.floor(distance / (1000 * 60 * 60 * 24));//일
       var h = Math.floor((distance / (1000*60*60)) % 24);//시간
       var m = Math.floor((distance / (1000*60)) % 60);//분
       var s = Math.floor((distance / 1000) % 60);//초

       document.getElementById("single-notice").innerHTML = d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
}

$(function () {
	
	//패럴럭스 스크롤, 줌
	var ref = 100;
	var scroll, zoom;
	
	// 스크롤 시에 헤더 숨김; 
	var didScroll;
	var lastScrollTop = 0; 
	var delta = 5; // 동작의 구현이 시작되는 위치 
	var navbarHeight = $header.outerHeight(); // 영향을 받을 요소를 선택
	
	$(window).scroll(function (event) {
		didScroll = true;
		
		//Parallax Zoom
		scroll = $(window).scrollTop()
		zoom = ref + scroll/30
		//$ban.css('transform', "scale("+zoom/100 + ')')
		
		// if (scroll < 1) {
		// 	$('#single-notice').css('display', 'none');
		// } else {
		// 	$('#single-notice').css('display', 'inline-block');
		// }
	 });
	 
	 //스크롤 시에 헤더 숨김
	 setInterval(function() {
		 if (didScroll) {
			 hasScrolled();
			 didScroll = false;
		 }
	 }, 50);
	 
	 function hasScrolled() {
		 
		 if (Math.abs(lastScrollTop - scroll) <= delta)
		 return;
		 
		 //scroll 위치가 100 내외일때에 공지 토글
		 if (scroll > 100) {
			 $notice.css('opacity', '0');
		 } else if (scroll < 100) {
			 $notice.css('opacity', '1');
		 }
		 
		 if (scroll > lastScrollTop && scroll > navbarHeight) {
			 //Scroll Down 시의 동작
			 $logo.css('width', '32px');
	
			 $hamburger.css('margin-right', '22px');
			 $hamburger.css('margin-top', '-12px');
			 $hamburger.css('transform', 'scale(0.5)');
		 } else if ((scroll + 150 /*iOS등 일부 OS의 오버스크롤기능과 충돌함을 방지하기 위함*/ ) + $(window).height() < $(document).height()) {
			 
			 //Scroll Up 시의 동작
			 $logo.css('width', '48px');
			 
			 $hamburger.css('margin-right', '30px');
			 $hamburger.css('margin-top', '-8px');
			 $hamburger.css('transform', 'scale(0.8)');
			 }
		 
		 lastScrollTop = scroll;
	 }
	 
});

//전체적인 웹페이지를 매끄럽게 만들기위한 과정
function menuProjects(){
	hideMenu();
	$('#block-projects').css('display', 'block');
	$('#block-main').css('display', 'none');
}

function Home() {
	$('#block-projects').css('display', 'none');
	$('#block-main').css('display', 'block');
}
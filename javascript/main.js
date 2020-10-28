var $overlay_load = $('#overlay-load');
var $hamburger = $('.hamburger');
var $logo = $('#main-logo-image');
var $notice = $('.single-notice');
var $menu = $('#menu-overlay');
var $header = $('#main-header');


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

//�޴� ��ư�� ������ �� ó��
var menu = 0;
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
			//scroll�ϸ鼭 �۾��� ����� ������� ��������.
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

$(function () {
	
	//�з����� ��ũ��, ��
	var ref = 100;
	var scroll, zoom;
	
	// ��ũ�� �ÿ� ��� ����; 
	var didScroll;
	var lastScrollTop = 0; 
	var delta = 5; // ������ ������ ���۵Ǵ� ��ġ 
	var navbarHeight = $header.outerHeight(); // ������ ���� ��Ҹ� ����
	
	$(window).scroll(function (event) {
		didScroll = true;
		
		//Parallax Zoom
		scroll = $(window).scrollTop()
		zoom = ref + scroll/30
	 });
	 
	 //��ũ�� �ÿ� ��� ����
	 setInterval(function() {
		 if (didScroll) {
			 hasScrolled();
			 didScroll = false;
		 }
	 }, 50);
	 
	 function hasScrolled() {
		 
		 if (Math.abs(lastScrollTop - scroll) <= delta)
		 return;
		 
		 //scroll ��ġ�� 100 �����϶��� ���� ���
		 if (scroll > 100) {
			 $notice.css('opacity', '0');
		 } else if (scroll < 100) {
			 $notice.css('opacity', '1');
		 }
		 
		 if (scroll > lastScrollTop && scroll > navbarHeight) {
			 //Scroll Down ���� ����
			 $logo.css('width', '32px');
	
			 $hamburger.css('margin-right', '22px');
			 $hamburger.css('margin-top', '-12px');
			 $hamburger.css('transform', 'scale(0.5)');
		 } else if ((scroll + 150 /*iOS�� �Ϻ� OS�� ������ũ�ѱ�ɰ� �浹���� �����ϱ� ����*/ ) + $(window).height() < $(document).height()) {
			 
			 //Scroll Up ���� ����
			 $logo.css('width', '48px');
			 
			 $hamburger.css('margin-right', '30px');
			 $hamburger.css('margin-top', '-8px');
			 $hamburger.css('transform', 'scale(0.8)');
			 }
		 
		 lastScrollTop = scroll;
	 }
	 
});
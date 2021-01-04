var $close;
var $pagination;
var $header;
var $footer;
var $intro;
var $main;
var $postframe;
var $body;

function openPost(url) {
  $("#loadingModal").addClass("active");
  $("#postframe").attr("onload", "upPost(this)");
  $("#postframe").attr("src", "/images/posts/" + url + "/post.html");
}

function upPost() {
  $("#loadingModal").removeClass("active");

  $("#postModal").css("animation-name", "postModalopen");
  $("#postModal").css("top", "0%");
  $("#block-main").css("animation-name", "postModalopenbg");
  $("#block-main").css("opacity", "0");

  $("#gallery-pagination").css("display", "none");

  $("#btn-close").css("display", "inline-block");
  $("#btn-intro").css("display", "none");

  setTimeout(function() {
	$("body").addClass("lock-position");
  }, 500);

  console.log("post opened");
}

function closePost() {
  $("#postModal").css("animation-name", "postModalclose");
  $("#postModal").css("top", "100%");

  $("#block-main").css("animation-name", "postModalclosebg");
  $("#block-main").css("opacity", "1");

  $("#gallery-pagination").css("display", "flex");

  $("#btn-close").css("display", "none");

  $("#btn-intro").css("display", "inline-block");

  $("body").removeClass("lock-position");
  console.log("post closed");
}

$(window).scroll(function () {
  var $height = $(window).scrollTop();
  var $body = $(".body").height();
  var result = ($body / $height) * 100;
  var deg = (360 / result) * 100;

  if (deg < 0) {
    deg == 0;
  } else if (deg >= 360) {
    deg == 360;
  }

  if ($height < 0) {
    height == 0;
  }

  //gallery Parallax;
  $("#swiper-gallery").css("transform", "translateY(" + $height / 1.75 + "px)");
  $("#swiper-gallery").css("opacity", 100 - $height / 10 + "%");

  //header는 스크롤을 바닥에 닿자마자 반전
  if ($height > $body - 30) {
    $(".cont-header").css("filter", "invert(1) hue-rotate(180deg)");
    $("#gallery-pagination").css("display", "none");
    $(".header").addClass("blur");
  } else {
    $(".body").css("background-color", "#000");
    $(".cont-header").css("filter", "invert(0)");
    $("#gallery-pagination").css("display", "flex");
    $("#btn-intro").text("⍗");
    $(".header").removeClass("blur");
  }

  //footer는 스크롤을 시작하자마자 반전
  if ($height > 60) {
    $(".cont-footer").css("filter", "invert(1)  hue-rotate(180deg)");
    $(".footer").addClass("blur");
    $("#btn-intro").text("⍐");
    stopBounce();
  } else {
    $(".cont-footer").css("filter", "invert(0)");
    $(".footer").removeClass("blur");
  }

  $("#main-logo-image").css("transform", "rotateX(" + deg + "deg)");
});

function gotoIntro() {
  var $height = $(window).scrollTop();
  var $body = $("#main-contents").height();

  if ($height < $body) {
    $("html, body").animate(
      { scrollTop: $("#intro-contents").offset().top },
      500
    );
  } else if ($height >= $body) {
    $("html, body").animate({ scrollTop: 0 }, 500);
  }
}

function stopBounce() {
  $("#btn-intro").css("animation-iteration-count", "1");
}

var $close;
var $pagination;
var $header;
var $footer;
var $intro;
var $main;
var $postframe;
var $body;

function goHome() {
  $("html, body").animate({ scrollTop: 0 }, 500);
  closePost();
  console.log("Home clicked");
}

function openPost(url) {
  $.lockBody();
  $("#loadingModal").addClass("active");
  $("#postframe").attr("onload", "upPost(this)");
  $("#postframe").attr("src", url);
  $(this).addClass('loading');
}

function upPost() {
  $("#loadingModal").removeClass("active");

  $("#postModal").css("animation-name", "postModalopen");
  $("#postModal").css("top", "0%");
  $("#block-main").css("animation-name", "postModalopenbg");
  $("#block-main").css("opacity", "0");

  $("#gallery-pagination").css("display", "none");
  $("#word").css("display", "none");

  $("#btn-close").css("display", "flex");
  $("#btn-intro").css("display", "none");
}

function closePost() {
  $("#postModal").css("animation-name", "postModalclose");
  $("#postModal").css("top", "100%");

  $("#block-main").css("animation-name", "postModalclosebg");
  $("#block-main").css("opacity", "1");

  $("#gallery-pagination").css("display", "flex");
  $("#word").css("display", "inline-block");

  $("#btn-close").css("display", "none");

  $("#btn-intro").css("display", "inline-block");

  $(".project-slide").removeClass('loading');
  $.unlockBody();
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
  $("#swiper-gallery").css("transform", "translateY(-" + $height / 3 + "px)");
  $("#swiper-gallery").css("opacity", 100 - $height / 10 + "%");

  //header는 스크롤을 바닥에 닿자마자 반전
  if ($height >= $body - 48) {
    $(".cont-header").css("filter", "invert(1) hue-rotate(180deg)");
    $("#gallery-pagination").css("display", "none");
    $("#word").css("display", "none");
    $(".header").addClass("blur");

    //화면이 펼쳐지면 인디케이터가 멈춤
    stopBounce();
  } else {
    $(".body").css("background-color", "#000");
    $(".cont-header").css("filter", "invert(0)");
    $("#gallery-pagination").css("display", "flex");
    $("#word").css("display", "inline-block");
    $("#btn-intro").text("⍗");
    $(".header").removeClass("blur");
  }

  //footer는 스크롤을 시작하자마자 반전
  if ($height >= 48) {
    $(".cont-footer").css("filter", "invert(1)  hue-rotate(180deg)");
    $(".footer").addClass("blur");
    $("#btn-intro").text("⍐");
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

//프로젝트 이미지 불러오기
function startLoadFile() {
  $.ajax({
    url: "/contents/gallery/gallery.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      createGallery(data);
    },
  });

  $.ajax({
    url: "/contents/portfolio/portfolio.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      createLogs(data);
    },
  });
}

// JSON 포멧 데이터 처리
function createGallery(objImageInfo) {
  var gallery = objImageInfo.gallery;
  var strDOM = "";
  for (var i = 0; i < gallery.length; i++) {
    // N번째 이미지 정보를 구하기
    var image = gallery[i];

    // N번째 이미지 패널을 생성
    strDOM += '<div class="swiper-slide project-slide" id="' + image.id + '">';
    strDOM +=
      "<div onclick='openPost(" +
      '"' +
      image.url +
      '"' +
      ");'>";
    strDOM +=
      '   <img class="swiper-lazy" src="' +
      image.thumb +
      '" alt="' +
      image.type +
      " / " +
      image.name +
      '" />';
    strDOM += '   <p class="project-title">' + image.name + "</p>";
    strDOM += " </div>";
    strDOM += "</div>";
  }

  // 이미지 컨테이너에 생성한 이미지 패널들을 추가하기
  var $galleryContainer = $("#gallery-container");
  $galleryContainer.append(strDOM);

  try {
    swiperProjects.init();
  } catch (error) {
    console.log("Swiper Reloaded");
    startLoadFile();
  }
}

// JSON 포멧 데이터 처리
function createLogs(objImageInfo) {
  var logs = objImageInfo.logs;
  var strDOM = "";
  for (var i = 0; i < logs.length; i++) {
    // N번째 이미지 정보를 구하기
    var image = logs[i];

    // N번째 이미지 패널을 생성
    strDOM +=
      '<li class="item" ' +
      'id="' +
      image.id +
      '"' +
      'onclick="openPost(' +
      "'" +
      image.url +
      "'" +
      ');">';
    strDOM +=
      '<img src="' +
      image.thumb +
      '" alt="' +
      image.type +
      " / " +
      image.name +
      '"/>';

    strDOM += '<div class="item-desc">';
    strDOM += '<p class="letter medium black">' + image.name + "</p>";
    strDOM +=
      '<p class="letter small black invert right">' +
      image.type +
      ", " +
      image.year +
      "</p>";
    strDOM += "</div></li>";
  }

  // 이미지 컨테이너에 생성한 이미지 패널들을 추가하기
  var $portfolioContainer = $("#logs-list");
  try {
    $portfolioContainer.append(strDOM);
  } catch (error) {
    console.log("Logs Contents Reloaded");
    $portfolioContainer.append(strDOM);
  }
}

var words = ["hello", "try scroll down", "there's a bigger me"],
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 50,
  speed = 25;

var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
    $("#word").text(part);
  }, speed);
};

// prevent body scroll
var $docEl = $('html, body'),
  $wrap = $('.body'),
  $scrollTop;

$.lockBody = function() {
  if(window.pageYOffset) {
      $scrollTop = window.pageYOffset;
      $wrap.css({
          top: - ($scrollTop)
      });
  }
  $docEl.css({
      height: "100%",
      overflow: "hidden"
  });
}

$.unlockBody = function() {
  $docEl.css({
      height: "",
      overflow: ""
  });
  $wrap.css({
      top: ''
  });
  window.scrollTo(0, $scrollTop);
  window.setTimeout(function () {
      $scrollTop = null;
  }, 0);
}
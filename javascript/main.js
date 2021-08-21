var $close;
var $pagination;
var $header;
var $footer;
var $gallery;
var $main;
var $postframe;
var $body;

function goHome() {
  $("html, body").animate({ scrollTop: 0 }, 500);
  closePost();
  console.log("Home clicked");
}

function openPost(url) {
  $("#postframe").attr("onload", "upPost(this)");
  $('#loadingModal').addClass('active');

  $("#postframe").attr("src", url);
  $(this).addClass("loading");

  $("body").css("overflow", "hidden");
}

function upPost() {
  $('#loadingModal').removeClass('active');

  $(".header").addClass("onPost");
  $(".header").removeClass("blur");
  $(".footer").addClass("onPost");
  $(".footer").removeClass("blur");

  $("#postModal").css("animation-name", "postModalopen");
  $("#postModal").css("z-index", "99");
  $("#postModal").css("opacity", "1");

  $("#btn-close").css("display", "flex");
  $(".hamburger").css("display", "none");

  $("#btn-gallery").css("display", "none");
}

function closePost() {
  $("#postModal").css("animation-name", "postModalclose");
  $("#postModal").css("opacity", "0");

  $("#word").css("display", "inline-block");

  $("#btn-close").css("display", "none");
  $(".hamburger").css("display", "flex");

  $("#btn-gallery").css("display", "inline-block");

  $(".header").removeClass("onPost");
  $(".header").addClass("blur");
  $(".footer").removeClass("onPost");
  $(".footer").addClass("blur");

  $("body").css("overflow", "auto");

  window.setTimeout(function () {
    $("#postModal").css("z-index", "-99999");
    $("#postframe").contents().find("body").html("");
  }, 250);
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
  // $("#swiper-gallery").css("transform", "translateY(-" + $height / 3 + "px)");
  $("#gallery-contents > div").css("opacity", 0 + $height / 10 + "%");

  //header는 스크롤을 바닥에 닿자마자 반전
  if ($height >= $body - 48) {
    $(".cont-header").css("filter", "invert(1) hue-rotate(180deg)");
    $(".header").addClass("blur");
    $(".mainNav").addClass("blur");

    $("#gallery-contents > div").css("opacity", "1");

    $(".mainTab").css("display", "inline-block");
    $(".body").css("background-color", "#fff");
    //화면이 펼쳐지면 인디케이터가 멈춤
    stopBounce();
  } else {
    $(".body").css("background-color", "#111");
    $(".cont-header").css("filter", "invert(0)");

    $("#btn-gallery").text("⍗");
    $(".header").removeClass("blur");
    $(".mainNav").removeClass("blur");
    $(".mainTab").css("display", "none");

    
  }

  //footer는 스크롤을 시작하자마자 반전
  if ($height >= 48) {
    $(".cont-footer").css("filter", "invert(1)  hue-rotate(180deg)");
    $(".footer").addClass("blur");
    $("#btn-gallery").text("⍐");
  } else {
    $(".cont-footer").css("filter", "invert(0)");
    $(".footer").removeClass("blur");
  }

  $("#main-logo-image").css("transform", "rotateX(" + deg + "deg)");
});

function gotoGallery() {
  var $height = $(window).scrollTop();
  var $body = $("#main-contents").height();

  if ($height < $body) {
    $("html, body").animate(
      { scrollTop: $("#gallery-contents").offset().top },
      500
    );
  } else if ($height >= $body) {
    $("html, body").animate({ scrollTop: 0 }, 500);
  }
}

function stopBounce() {
  $("#btn-gallery").css("animation-iteration-count", "1");
}

//프로젝트 이미지 불러오기
function startLoadFile() {
  var $gridsContainer = $("#grids-list");
  $gridsContainer.html("");

  $.ajax({
    url: "/assets/gallery/gallery.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      createGallery(data);
      createGrids(data);
    },
  });

  // $.ajax({
  //   url: "/assets/portfolio/portfolio.json",
  //   type: "GET",
  //   dataType: "json",
  //   success: function (data) {
  //     createLogs(data);
  //   },
  // });
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
    strDOM += "<div onclick='openPost(" + '"' + image.url + '"' + ");'>";
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

function createGrids(objImageInfo) {
  var logs = objImageInfo.gallery;
  var strDOM = "";

  for (var i = 0; i < logs.length; i++) {
    // N번째 이미지 정보를 구하기
    var image = logs[i];

    appendList();
    // if ($("#navAll").is(":checked")) {
    //   appendList();
    // }

    // else if ($("#navArtworks").is(":checked")) {
    //   if (image.type == "poster") {
    //     appendList();
    //   } else if (image.type == "albumcover") {
    //     appendList();
    //   }
    // }

    // else if ($("#navProjects").is(":checked")) {
    //   if (image.type == "ui") {
    //     appendList();
    //   }
    // }

    function appendList() {
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
      strDOM += '<p class="text medium black">' + image.name + "</p>";
      strDOM +=
        '<p class="text small black invert right" style="color:#fff">' +
        image.type +
        ", " +
        image.year +
        "</p>";
      strDOM += "</div></li>";
    }
  }

  // 이미지 컨테이너에 생성한 이미지 패널들을 추가하기
  var $gridsContainer = $("#grids-list");
  try {
    $gridsContainer.append(strDOM);

    // $(".item").css("height", $(".item").width());
  } catch (error) {
    console.log("Logs Contents Reloaded");
    $gridsContainer.append(strDOM);
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
    strDOM += '<p class="text medium black">' + image.name + "</p>";
    strDOM +=
      '<p class="text small black invert right">' +
      image.type +
      ", " +
      image.year +
      "</p>";
    strDOM += "</div></li>";
  }

  // 이미지 컨테이너에 생성한 이미지 패널들을 추가하기
  var $gridsContainer = $("#logs-list");
  try {
    $gridsContainer.append(strDOM);
  } catch (error) {
    console.log("Logs Contents Reloaded");
    $gridsContainer.append(strDOM);
  }
}


function showCoverflow() {
  $("html, body").animate(
    { scrollTop: $("#gallery-contents").offset().top },
    500
  );
  $("#swiper-gallery").css("display", "block");
  $("#grids-gallery").css("display", "none");
}

function showGrids() {
  $("html, body").animate(
    { scrollTop: $("#gallery-contents").offset().top },
    500
  );
  $("#swiper-gallery").css("display", "none");
  $("#grids-gallery").css("display", "flex");
}
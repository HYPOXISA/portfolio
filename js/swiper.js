$(function () {
  var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        var activeIndex = swiper.activeIndex;
        $(".head li").removeClass("on");
        $(".head li").eq(activeIndex).addClass("on");
        $("#modal").css("display", "none");

        // .p2_tex 및 .profill의 움직임
        if (activeIndex === 1) {
          $(".p2_tex").addClass("on");
        } else {
          $(".p2_tex").removeClass("on");
        }

        if (activeIndex === 4) {
          $(".profill").addClass("on");
        } else {
          $(".profill").removeClass("on");
        }
      },
    },
  });

  // header 클릭 이벤트
  $(".head > li").on("click", function () {
    var i = $(this).index();
    $(".head > li").removeClass("on");
    $(".head > li").eq(i).addClass("on");
    swiper.slideTo(i, 1000, false); // Swiper 슬라이드로 이동
  });

  // 메인 글자 나타나기
  $(".tex h1").each(function () {
    var text = $(this).text();
    var html = "";
    for (var i = 0; i < text.length; i++) {
      html += '<span style="display:none">' + text[i] + "</span>";
    }
    $(this).html(html);
  });

  function showText(element, index, interval) {
    if (index < element.length) {
      $(element[index]).fadeIn(interval, function () {
        showText(element, index + 1, interval);
      });
    }
  }
  showText($(".tex h1 span"), 0, 100);

  // 롤링배너
  function move() {
    var left = parseInt($(".roll").css("left"));
    if (left <= -170) {
      $(".roll").css({ left: "-22px" });
      $(".roll li").first().appendTo(".roll");
    } else {
      $(".roll").css({ left: left - 1 + "px" });
    }
  }
  setInterval(move, 20);

  var slideInterval;

  // web 슬라이드
  function startSlide() {
    slideInterval = setInterval(function () {
      $(".web").animate({ left: "-38%" }, 1500, function () {
        $(".web li:first").appendTo(".web");
        $(".web").css({ left: 0 });
      });
    }, 4000);
  }

  startSlide();

  // web li:stop
  $(".web li").on("mouseenter", function () {
    clearInterval(slideInterval);
  });
  $(".web li").on("mouseleave", function () {
    startSlide();
  });

  // web button
  $(".web-left").on("click", function () {
    moveLeft();
  });
  $(".web-right").on("click", function () {
    moveRight();
  });

  // web button 함수
  function moveLeft() {
    $(".web")
      .stop()
      .animate({ left: "-38%" }, 300, function () {
        $(".web li:first-child").appendTo(".web");
        $(".web").css({ left: 0 });
      });
  }
  function moveRight() {
    $(".web")
      .stop()
      .animate({ left: "38%" }, 300, function () {
        $(".web li:last-child").prependTo(".web");
        $(".web").css({ left: 0 });
      });
  }

  // 박스를 하나씩 떠오르게 하는 함수
  function showBoxes(selector) {
    $(selector).each(function (index) {
      $(this)
        .delay(200 * index)
        .queue(function (next) {
          $(this).addClass("visible");
          next();
        });
    });
  }

  // 박스를 숨기는 함수
  function hideBoxes(selector) {
    $(selector).removeClass("visible");
  }

  // Intersection Observer API를 사용하여 페이지 3에 도달했을 때 박스 나타내기
  var observerOptions = {
    threshold: 0.1,
  };

  var webObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        showBoxes(".web");
      } else {
        hideBoxes(".web");
      }
    });
  }, observerOptions);

  var illustObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        showBoxes(".illust");
      } else {
        hideBoxes(".illust");
      }
    });
  }, observerOptions);

  webObserver.observe(document.querySelector("#page3"));
  illustObserver.observe(document.querySelector("#page4"));

  // modal
  var modal = $("#modal");
  var modalContent = $(".modal-content");
  var modalBody = $("#modal-body");

  // .mo 버튼 클릭 시 모달 표시 및 내용 로드
  $(".mo,#page4 img").on("click", function () {
    var parent = $(this).parent().parent();
    var imgSrc = parent.find("img").attr("src");
    var content = "";

    // 각 .mo 버튼에 맞는 내용 설정
    switch (imgSrc) {
      case "img/늘해랑.JPG":
        content =
          "<ul><li><h2>늘해랑</h2><p class='title'>수공예 도자기의 특별한 가치</p><p class='main'>PAGE: Main + Sub*13<br>TOOL: Figma, HTML, CSS, JS(jQuery),React<br>PROCESS: Swiper Js<br>참여도: 100%</li><li><img src='img/늘해랑_반응형.png' alt='늘해랑'></li></ul>";
        break;
      case "img/sant.JPG":
        content =
          "<ul><li><h2>Santa Maria Novella</h2><p class='title'>800년 피렌체 헤리티지를 담은 라이프스타일 뷰티</p><p class='main'>PAGE: Main + Sub*5<br>TOOL: Figma, HTML, CSS, JS(jQuery)<br>PROCESS: Swiper Js, Googlemap<br>참여도: 100%</li><li><img src='img/산타마리아-노벨라_반응형.png' alt='산타마리아 노벨라'></li></ul>";
        break;
      case "img/movie1.JPG":
        content = "<h2>영화 조별</h2><p>영화 조별 사이트 설명...</p>";
        break;
      case "img/todoList.JPG":
        content =
          "<ul><li><h2>Calendar AND ToDoList</h2><p class='title'>바쁜 일정을 보다 쉽게 정리하고 알려줍니다.</p><p class='main'>PAGE: Main<br>TOOL: Figma, HTML, CSS, JS(Java Script)<br>참여도: 100%<br>기능설명: 원하는 날을 선택하고 일정을 등록하면 캘린더에 빨간 점이 나타나며 어느 날짜에 일정이 있는지 보기 쉽게 알려줍니다.</li><li><img src='img/투두리스트_반응형.png' alt='투두리스트'></li></ul>";
        break;
      case "img/weather.JPG":
        content =
          "<h2>날씨 API</h2><p>날씨 API 사이트 설명...</p><h1>준비중...</h1>";
        break;
      case "img/오징어.jpg":
        content =
          "<ul><li><h2>오징어 일러스트</h2><p class='title'>일러스트 설명</p><p class='main'>TOOL: Illustrator<br>참여도: 100%</li><li><img class='illustImg' src='img/오징어.jpg' alt='오징어 일러스트'></li></ul>";
        break;
      case "img/pink.jpg":
        content =
          "<ul><li><h2>KARINA</h2><p class='title'>일러스트 설명</p><p class='main'>TOOL: Illustrator<br>참여도: 100%</li><li><img class='illustImg' src='img/pink.jpg' alt='pink 일러스트'></class='illust'li></ul>";
        break;
      default:
        content = "<h2>이미지 설명</h2><p>기본 설명...</p>";
    }

    // 모달 내용 설정 및 표시
    modalContent.html(content);
    modal.css("display", "block");
    setTimeout(function () {
      modalContent.addClass("show");
    }, 10);
  });

  // 모달 닫기
  $(".close").on("click", function () {
    modalContent.removeClass("show");
    setTimeout(function () {
      modal.css("display", "none");
    }, 1000); // 애니메이션 완료 후 모달을 숨깁니다.
  });

  // 모달 영역 밖 클릭 시 모달 닫기
  $(window).on("click", function (event) {
    if ($(event.target).is(modal)) {
      modalContent.removeClass("show");
      setTimeout(function () {
        modal.css("display", "none");
      }, 500); // 애니메이션 완료 후 모달을 숨깁니다.
    }
  });
});

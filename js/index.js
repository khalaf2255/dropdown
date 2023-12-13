let currentIndex;
let correctImage;
let totalActiveQuestions = $(".carousel-item.active").find(".dropdown").length;
$(document).ready(function () {
  getCurrentIndex();
  if ($("body").find(".carousel-item").length < 2) {
    $(".carousel-control-next, .carousel-control-prev, .reloadScrren").hide();
  } else {
    $(".carousel-control-next, .carousel-control-prev, .reloadScrren").show();
  }
});

//  CLICK OPTION
$(".box").each(function () {
  $(this).on("click", function () {
    let optionClicked = $(this).attr("data_answer");

    // CHECK CORRECT ANSWER --------------------------------------------->
    if (optionClicked === "correct") {
      $(this).addClass("complete green_border");
      let completeQuestion = $(".carousel-item.active").find(
        ".complete"
      ).length;
      $(this).addClass("green_border"); 
      $(".carousel-item.active .box").each(function () {
        if ($(this).attr("data_answer") !== "correct") {
          $(this).addClass("disabled");
        }
      }).addClass("preventClick");
      if (completeQuestion) {
        $(".showAnsBtn").addClass("disabled");
        $(".carousel-item.active").addClass("Done");
      } else {
        $(".showAnsBtn").removeClass("disabled");
      }
      playSound("././assets/audio/correct.mp3");
    } else {
      // CHECK INCORRECT ANSWER --------------------------------------------->
      playSound("././assets/audio/incorrect.mp3");
      $(this).addClass("red_border");
      $(".carousel-item.active .box").addClass("preventClick");
      setTimeout(() => {
        $(this).removeClass("red_border");
      }, 200);
      setTimeout(() => {
        $(this).addClass("red_border");
      }, 400);

      setTimeout(() => {
        $(this).removeClass("red_border");
        $(".carousel-item.active .box").removeClass("preventClick");
      }, 600);
    }
  });
});

// CHECK BTN DISABLED WITH ACTIVE ITEM
function checkShowAnsBtnIsDisabled() {
  return (
    totalActiveQuestions ===
    $(".carousel-item.active").find(".preventClickabled").length
  );
}
// SHOW ALL ANSWERS --------------------------------------------->
$(".showAnsBtn").on("click", function () {
  $(".carousel-item.active").addClass("Done");
  $(this).addClass("disabled");
  $(".carousel-item.active .box")
    .each(function () {
      if ($(this).attr("data_answer") !== "correct") {
        $(this).addClass("disabled");
      } else {
        $(this).addClass("green_border");
      }
    })
    .addClass("preventClick");
});

// RELOAD SCREEN ------------------------------------------------->
$(".reloadScrren").on("click", function () {
  $(".carousel-item.active  .box ").removeClass(
    "preventClick complete green_border disabled"
  );
  $(".showAnsBtn").removeClass("disabled");
  $(".carousel-item.active").removeClass("Done");
});

// RELOAD ALL EXERSIICE ----------------------------------------->
$(".reloadAll").on("click", function () {
  $(".box ").removeClass("preventClick complete green_border  disabled");
  $(".showAnsBtn").removeClass("disabled");
  $(".carousel-item").removeClass("Done");

  if (currentIndex == 1) {
    $(".carousel-control-prev").addClass("disabled");
    $(".carousel-control-next").removeClass("disabled");
  } else {
    $(".carousel-control-next").addClass("disabled");
    $(".carousel-control-prev").removeClass("disabled");
  }
});

// GET CURRENTINDEX OF SLIDE ----------------------------------------->
function getCurrentIndex() {
  currentIndex = +$(".carousel-item.active").attr("index");
}
// NEXT SLIDE ----------------------------------------->
$(".carousel-control-next, .carousel-control-prev, .carousel-indicators li").on(
  "click",
  function () {
    checkDisabledWithBtn();
    getCurrentIndex();
    $(".dropdown ").removeClass("show");
    if (currentIndex == 1) {
      $(".carousel-control-next").addClass("disabled");
      $(".carousel-control-prev").removeClass("disabled");
    } else {
      $(".carousel-control-prev").addClass("disabled");
      $(".carousel-control-next").removeClass("disabled");
    }
  }
);

// CHECK DISABLED SHOW ANSWER BURRON ----------------------------------------->
function checkDisabledWithBtn() {
  $(".ques").removeClass("selected");
  console.log(
    totalActiveQuestions,
    $(".carousel-item.active").find(".preventClick").length
  );
  let checkInterval = setInterval(() => {
    if ($(".carousel-item.active").hasClass("Done")) {
      $(".showAnsBtn").addClass("disabled");
    } else {
      $(".showAnsBtn").removeClass("disabled");
    }
  }, 100);

  setTimeout(() => {
    clearInterval(checkInterval);
  }, 1000);
}

// PLAY SOUND ----------------------------------------->
function playSound(srcSound) {
  let audio = document.createElement("audio");
  audio.src = srcSound;
  audio.play();
}

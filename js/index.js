let currentIndex;
let correctImage;
let totalActiveQuestions = $(".carousel-item.active").find(".ans").length;
$(document).ready(function () {
  getCurrentIndex();
  if ($("body").find(".carousel-item").length < 2) {
    $(".carousel-control-next, .carousel-control-prev, .reloadScrren").hide();
  } else {
    $(".carousel-control-next, .carousel-control-prev, .reloadScrren").show();
  }
});

//  CLICK OPTION
$(".letter").each(function () {
  $(this).on("click", function () {
    let letterClicked = $(this).html();
    let that = $(this);

    $(".letter").addClass("preventClick");
    setTimeout(() => {
      $(".letter").removeClass("preventClick");
    }, 500);

    $(".ans").each(function () {
      let correctLetter = $(this).attr("data_letter");
      let lettersAnswerArray = $(this)
        .parent()
        .attr("correct_answer")
        .split("");

      // CHECK CORRECT ANSWER --------------------------------------------->
      if (lettersAnswerArray.includes(letterClicked)) {
        playSound("././assets/audio/correct.mp3");
        if ($(this).attr("data_letter") === letterClicked) {
          $(this).attr("data_letter", correctLetter).html(letterClicked);
          $(that).addClass(" selected disabled complete");

          // ISCOMPLETE ALL QUESTIONS--------------------------------------------->
          if (checkShowAnsBtnIsDisabled()) {
            $(".question").addClass("Done preventClick");
            $(".showAnsBtn").addClass("disabled");
          } else {
            $(".showAnsBtn").removeClass("disabled");
          }
        }
      } else {
        // CHECK INCORRECT ANSWER --------------------------------------------->
        playSound("././assets/audio/incorrect.mp3");
        $(that).addClass(" flash");
        setTimeout(() => {
          $(that).removeClass("flash");
        }, 200);
        setTimeout(() => {
          $(that).addClass("flash");
        }, 400);
        setTimeout(() => {
          $(that).removeClass(" flash");
        }, 600);
      }
    });
  });
});

// CHECK BTN DISABLED WITH ACTIVE ITEM
function checkShowAnsBtnIsDisabled() {
  return (
    totalActiveQuestions === $(".carousel-item.active").find(".complete").length
  );
}
// SHOW ALL ANSWERS --------------------------------------------->
$(".showAnsBtn").on("click", function () {
  $(this).addClass("disabled");
  $(".ans").each(function () {
    $(this)
      .html($(this).attr("data_letter"))
      .addClass("preventClick complete green_color");
  });
  $(".letters .letter").addClass("complete disabled");
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
  $(".letters .letter").removeClass("complete disabled");
  $(".question ").removeClass("Done preventClick") 
  // $(".question ").addClass("preventClick disabled");
  $(".ans").removeClass("preventClick complete green_color").html(" ");

  // ------------------------------------------------>
  $(".showAnsBtn").removeClass("disabled");

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

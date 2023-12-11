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

//  CLICK DROMDOWN --------------------------------------------->
$(".dropdown").each(function () {
  $(this).on("click", function () {
    $(".dropdown").removeClass("show");

    $(this).addClass("show");
    $(this).find(".options").addClass("show").removeClass("hide");
  });
});

//  CLICK OPTION
$(".option").each(function () {
  $(this).on("click", function () {
    console.log("gg");
    let optionClicked = $(this).attr("data_answer");

    // CHECK CORRECT ANSWER --------------------------------------------->
    if (optionClicked === "correct") {
      $(this).parent().parent().addClass("green_border");

      $(".carousel-item.active .dropdown").removeClass("show");
      setTimeout(() => {
        $(".carousel-item.active.options").addClass("hide").removeClass("show");
        $(this).parent().addClass("hide").removeClass("show");
        $(this).parent().parent().addClass("preventClick");
      }, 10);

      $(this)
        .parent()
        .parent()
        .append($(this).children().clone().addClass("correctManual"))
        .addClass("complete");
      let completeQuestion = $(".carousel-item.active").find(
        ".complete"
      ).length;
      let allSlideQuestion = $(".carousel-item.active .question").length;

      if (completeQuestion === allSlideQuestion) {
        $(".showAnsBtn").addClass("disabled");
        $(".carousel-item.active").addClass("Done");
      } else {
        $(".showAnsBtn").removeClass("disabled");
      }
      playSound("././assets/audio/correct.mp3");
    } else {
      // CHECK INCORRECT ANSWER --------------------------------------------->
      playSound("././assets/audio/incorrect.mp3");
      $(this).parent().parent().addClass("red_border preventClick");
      setTimeout(() => {
        $(this).parent().parent().removeClass("red_border");
      }, 200);
      setTimeout(() => {
        $(this).parent().parent().addClass("red_border");
      }, 350);
      let wrongImage = `<image class="wrong" src=${$(this)
        .children()
        .attr("src")} />`;
      $(this).parent().parent().append(wrongImage);
      setTimeout(() => {
        $(this).parent().parent().find(".wrong").remove();
        $(this).parent().parent().removeClass("red_border preventClick");
      }, 500);
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
  $(".carousel-item.active .option").each(function () {
    if ($(this).attr("data_answer") === "correct") {
      correctImage = `<image class="correctManual" src=${$(this)
        .children()
        .attr("src")} />`;
      if (!$(this).parent().parent().children().hasClass("correctManual")) {
        $(this)
          .parent()
          .parent()
          .append(correctImage)
          .addClass("preventClick green_border");
      }
    }
  });
  $(".carousel-item.active .dropdown").removeClass("show");
  $(".carousel-item.active .options").addClass("show").removeClass("hide");
});

// RELOAD SCREEN ------------------------------------------------->
$(".reloadScrren").on("click", function () {
  $(".carousel-item.active .correctManual").remove();
  $(".carousel-item.active  .dropdown ").removeClass(
    "preventClick complete show green_border"
  );
  $(".showAnsBtn").removeClass("disabled");
  $(".carousel-item.active").removeClass("Done");
});

// RELOAD ALL EXERSIICE ----------------------------------------->
$(".reloadAll").on("click", function () {
  $(".showAnsBtn").removeClass("disabled");
  $(".correctManual").remove();
  $(".dropdown ").removeClass("preventClick complete show green_border");
  $(".options").addClass("show").removeClass("hide");
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

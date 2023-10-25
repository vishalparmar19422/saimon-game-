var ButtonColors = ["red", "green", "blue", "yellow"];
var gamepattern = [];
var userpattern = [];
var started = false;
var level = 0;


$(document).keydown(function (event) {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
 

  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  
  userpattern.push(userChosenColour);
  

  playSound(userChosenColour);
  animatePress(userChosenColour);

  
  checkAnswer(userpattern.length-1);
});
function nextSequence() {

  
  userpattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = ButtonColors[randomNumber];
  gamepattern.push(randomChosenColour);
  

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel) {

  if (gamepattern[currentLevel] === userpattern[currentLevel]) {
    console.log("success");
  


    if (userpattern.length === gamepattern.length) {
     
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
  } 


function startOver() {
  level = 0;
  gamepattern = [];
  userpattern=[];
  started = false;
  console.log(userpattern, gamepattern);
 
}
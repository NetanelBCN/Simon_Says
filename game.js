let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    let randomButton = $("#" + randomChosenColor);
    $(".btn").prop("disabled", true);
    setTimeout(function () {
        randomButton.fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }, 200);
    $(".btn").prop("disabled", false);

}

function playSound(name) {

    let myAudio = new Audio("./sounds/" + name + ".mp3");
    myAudio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {

        $("#" + currentColor).removeClass("pressed");

    }, 100)

}

function checkAns(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("succsses");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        restart();
        $(".btn").hide();
        console.log($(".btn"));

    }
}
function restart() {
    level = 0;
    gamePattern = [];
}

$(".btn").click(function () {

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAns(userClickedPattern.length - 1);
})


$(document).keydown(function () {

    if (level === 0) {
        $(".btn").show();
        setTimeout(function () {
            nextSequence();
        }, 500);

    }
})


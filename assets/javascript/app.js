// This is a Trivia Game App called Guess that Law.

//This game will be coded "on the fly". All html tags and content inside the body section will be generated here,.

//Game Outline:

//On document load, generate a landing page with a start button. The start button will trigger a function to setup the game.
$(document).ready(function() {

    $("body").append("<header class=\"jumbotron jumbotron-fluid\">");
    $(".jumbotron").append("<div class=\"container\" id=\"jumbo\">");
    $("#jumbo").append("<h1 class=\"display-3\">Guess That Law!</h1>", "<p class=\"lead\">The funnest trivia game you've never heard of.</p>");

    $("body").append("<section class=\"container\" id=\"clock\">");
    $("#clock").append("<div id=\"timer\">");
    $("#clock").slideUp(0);

    $("body").append("<main class=\"container\">");
    $("main").append("<div class=\"row\" id=\"start-container\">");
    $("#start-container").append("<div class=\"col-12\" id=\"start-column\">");
    $("#start-column").append("<button class=\"start-game\">Start Game</button>")
    console.log("page load complete")

});

//Clicking the start button will transition to question 1.
$("body").on("click", "button.start-game", function() {
    
    $("main").append("<div class=\"row\" id=\"question-container\">");
    $("#question-container").append("<div class=\"col-12\" id=\"question\">");

    $("main").append("<div class=\"row\" id=\"button-container\">");
    $("#button-container").append("<div class=\"col-12\" id=\"button-column\">");
    $("#button-column").append("<button id=\"choiceA\">", "<button id=\"choiceB\">", "<button id=\"choiceC\">", "<button id=\"choiceD\">");
    
    $("#clock, #question-container, #button-container").slideUp(0);

    console.log("start clicked");
    $("#start-container").slideUp(1000);
    $("#clock, #question-container, #button-container").delay(1000).slideDown(1500);

});


//Challenge: try to wrap as much of the code below as possible into an object. This may not be possible where scope issues develop.

//10 Questions, each stored in one array called "questionX"
//Index 0 will be the question, and Index 1-4 will be the options to choose.
//A boolean will be initially set to tie to the selection condition for the question displayed. 
//Variables for Correct, Incorrect, and Timedout answers will be created to store values.

var laW = {
    question1: ["question", "answer1", "answer2", "answer3", "answer4"],
    question2: ["question", "answer1", "answer2", "answer3", "answer4"],
    question3: ["question", "answer1", "answer2", "answer3", "answer4"],
    question4: ["question", "answer1", "answer2", "answer3", "answer4"],
    question5: ["question", "answer1", "answer2", "answer3", "answer4"],
    question6: ["question", "answer1", "answer2", "answer3", "answer4"],
    question7: ["question", "answer1", "answer2", "answer3", "answer4"],
    question8: ["question", "answer1", "answer2", "answer3", "answer4"],
    question9: ["question", "answer1", "answer2", "answer3", "answer4"],
    question10: ["question", "answer1", "answer2", "answer3", "answer4"],

    selectionPhase: true,
    correctAnswers: 0,
    incorrectAnswers: 0,
    timeOuts: 0,

}


//An interval with a setTimeout feature will wrap the below logic to give the user a limited time to answer each question.
//And start a countdown clock.

//Four buttons on the screen will be set with ID's #selectA, #selectB, #selectC, and #selectD.
//For each question that comes up on the screen, a condition will be checked for the user targeting the correct button ID. 
//The action of the if condition will flip a boolean (to end that selection phase of the question) and run the display pieces accordingly.
//The action will also udpate the interval, and timout features to prepare for the next question.
//The action will also increment the appropriate variable to keep score for the game.

//Once the interval has been completed (meeting a condition), the results of the game will be displayed.
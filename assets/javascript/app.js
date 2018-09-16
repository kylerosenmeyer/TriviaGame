// This is a Trivia Game App called Guess that Law.

//This game will be coded "on the fly". All html tags and content inside the body section will be generated here,.

// The game is mostly stored in the object laW.

var laW = {

    // This is the question bank for the game. It is a multi-dimensional array.

    questionBank: [
        ["question1", "answer1A", "answer1B", "answer1C", "answer1D"],
        ["question2", "answer2A", "answer2B", "answer2C","answer2D"],
        ["question3", "answer3A", "answer3B", "answer3C", "answer3D"],
        ["question4", "answer4A", "answer4B", "answer4C", "answer4D"],
        ["question5", "answer5A", "answer5B", "answer5C", "answer5D"],
        ["question6", "answer6A", "answer6B", "answer6C", "answer6D"],
        ["question7", "answer7A", "answer7B", "answer7C", "answer7D"],
        ["question8", "answer8A", "answer8B", "answer8C", "answer8D"],
        ["question9", "answer9A", "answer9B", "answer9C", "answer9D"],
        ["question10", "answer10A", "answer10B", "answer10C", "answer10D"],

    ],

    // Setup initial variables. correctAnswers, incorrectAnswers, and timeOuts are used for the final report. 
    // Questions asked keeps questions from being repeated, and qP is used in random selection.

    correctAnswers: 0,
    incorrectAnswers: 0,
    timeOuts: 0,
    questionsAsked: [],
    qP: 0,
    gamePhase: true,
    gameRestart: false,

    // Setup Variables for the timer.
    minutes: "00:",
    seconds: 30,
    timeCounter: "",

    //The game clock gives the user a countdown for each question, and turns red when less than 10 seconds remain!

    gameClock: function() {

        if ( laW.seconds < 10 ) {
            laW.minutes = "00:0"
            $("#clock").css("color", "red").css("font-weight", "bold")
        }
        $("#clock").text(laW.minutes + laW.seconds)
        laW.seconds--

        if ( ( laW.questionsAsked.length === 10 ) && ( laW.seconds < 0 ) ) {
            laW.timeOuts++
            console.log("timeOuts: " + laW.timeOuts)
            console.log("We are going to the Report")
            laW.gameReport()
        } else if ( ( laW.questionsAsked.length !== 10 ) && ( laW.seconds < 0 ) ) {
            clearInterval(laW.timeCounter)
            laW.timeOuts++
            console.log("timeOuts: " + laW.timeOuts)
            console.log("We are going on Break")
            //Take out the game containers
            $("#clock-container, #question-container, #button-container").fadeOut(2000)
            laW.gamePhase = false;
            setTimeout(laW.game, 7000)
        } 
            
    },

    //The gameDisplay and gameRestart functions do setup for the game to either come back or restart depending on which condition is triggered below.

    gameDisplay: function() {
        //Bring in the game containers
        $("#clock-container, #question-container, #button-container").fadeIn(2000)
        laW.gamePhase = true
        laW.minutes = "00:"
        laW.seconds = 30
        $("#clock").css("color", "black").css("font-weight", "none")
    },

    //The game function pulls a question from the questionBank array and populates the page. It also begins a new countdown.

    game: function() {

        //The first step of the game is to check a condition: is the game coming back from break or restart? There are some settings to run if either are true, listed directly above.

        if ( laW.gamePhase == false ) {
            console.log("We are coming back from break")
            laW.gameDisplay()
        }

        //The second step is to pull a random question, and make sure it hasn't been shown yet. The timer starts once a "new" question is found.

        laW.qP = Math.floor(Math.random()*10 )

        if ( laW.questionsAsked.indexOf(laW.qP) !== -1 ) {
            laW.game()
        } else {
            laW.questionsAsked.push(laW.qP)
            console.log("Current Question (index) is: " + laW.qP)
            console.log("Questions Asked: " + laW.questionsAsked)
            laW.timeCounter = setInterval(laW.gameClock, 1050)
        }

        //Display the question

        $("#question").text(laW.questionBank[laW.qP][0])
        $("#choiceA").text(laW.questionBank[laW.qP][1])
        $("#choiceB").text(laW.questionBank[laW.qP][2])
        $("#choiceC").text(laW.questionBank[laW.qP][3])
        $("#choiceD").text(laW.questionBank[laW.qP][4])
        $("#clock").text("00:30")

    },

    //The check functions are what process the user input. They check for the condition that choosing "their" button was the right button, log the score, and then they send the game to break.

    checkA: function() {
        console.log("You chose A")
        if ( ( this.qP === 0) || ( this.qP === 2 ) || ( this.qP === 4 ) ) {
            clearInterval(laW.timeCounter)
            this.correctAnswers++
            this.gameBreak()
        } else {
            clearInterval(laW.timeCounter)
            this.incorrectAnswers++
            this.gameBreak()
        }
    },

    checkB: function() {
        console.log("You chose B")
        if ( ( this.qP === 1) || ( this.qP === 8 ) || ( this.qP === 9 ) ) {
            clearInterval(laW.timeCounter)
            this.correctAnswers++
            this.gameBreak()
        } else {
            clearInterval(laW.timeCounter)
            this.incorrectAnswers++
            this.gameBreak()
        }
    },

    checkC: function() {
        console.log("You chose C")
        if ( ( this.qP === 5) || ( this.qP === 6 ) ) {
            clearInterval(laW.timeCounter)
            this.correctAnswers++
            this.gameBreak()
        } else {
            clearInterval(laW.timeCounter)
            this.incorrectAnswers++
            this.gameBreak()
        }
    },

    checkD: function() {
        console.log("You chose D")
        if ( ( this.qP === 3) || ( this.qP === 7 ) ) {
            clearInterval(laW.timeCounter)
            this.correctAnswers++
            this.gameBreak()
        } else {
            clearInterval(laW.timeCounter)
            this.incorrectAnswers++
            this.gameBreak()
        }
    },

    // These are the functions to run either in between questions or at the end of the game. The gameBreak question will also queue up the appropriate content to display during the break.

    gameBreak: function() {
        //Take out the game containers
        $("#clock-container, #question-container, #button-container").fadeOut(2000)
        laW.gamePhase = false;
        console.log("We are going on Break")
        setTimeout(laW.game, 4000)
    },

    gameReport: function() {
        //Take out the Game Containers
        $("#clock-container, #question-container, #button-container").fadeOut(2000)
        laW.gamePhase = false;
        clearInterval(laW.timeCounter)
        $("#report").text("How Well Do You Know Your Laws??")
        $("#report").append("<div class=\"results\">" + "Your Correct Answers: " + laW.correctAnswers + "</div>")
        $("#report").append("<div class=\"results\">" + "Your Wrong Answers: " + laW.incorrectAnswers + "</div>")
        $("#report").append("<div class=\"results\">" + "Your \"I Didn\'t Even Tries\": " + laW.timeOuts + "</div>")
        $("#report").append("<button id=\"restart\">TRY AGAIN</button>")
        //Bring in the Report Container
        $("#report-container").delay().fadeIn(2000)
        laW.questionsAsked = []
        
    },

    

};

//On document load, generate a landing page with a start button. The start button will trigger a function to setup the game.
//This includes making the clock div.

$(document).ready(function() {

    $("body").append("<header class=\"jumbotron jumbotron-fluid\">");
    $(".jumbotron").append("<div class=\"container\" id=\"jumbo\">");
    $("#jumbo").append("<h1 class=\"display-3\">Guess That Law!</h1>", "<p class=\"lead\">The funnest trivia game you've never heard of.</p>");

    $("body").append("<section class=\"container\">");
    $("section").append("<div class=\"row\" id=\"clock-container\">");
    $("#clock-container").append("<div class=\"col-12\" id=\"clock\">");
    

    $("body").append("<main class=\"container\">");
    $("main").append("<div class=\"row\" id=\"start-container\">");
    $("#start-container").append("<div class=\"col-12\" id=\"start-column\">");
    $("#start-column").append("<button class=\"start-game\">Start Game</button>")
    console.log("The Game is Ready to Start")

});

//Clicking the start button will transition to question 1.
//This creates the question div and 4 answer buttons to choose from.

$("body").on("click", "button.start-game", function() {
    
    $("main").append("<div class=\"row\" id=\"question-container\">");
    $("#question-container").append("<div class=\"col-12\" id=\"question\">");

    $("main").append("<div class=\"row\" id=\"button-container\">");
    $("#button-container").append("<div class=\"col-12\" id=\"button-column\">");
    $("#button-column").append("<button id=\"choiceA\">", "<button id=\"choiceB\">", "<button id=\"choiceC\">", "<button id=\"choiceD\">");

    $("main").append("<div class=\"row\" id=\"report-container\">");
    $("#report-container").append("<div class=\"col-12\" id=\"report\">");
    $("report-container").fadeOut(0);
    
    $("#clock-container, #question-container, #button-container").fadeOut(0);

    console.log("We are Starting the Game");
    $("#start-container").fadeOut(0);
    $("#clock-container, #question-container, #button-container").fadeIn(2000);

    laW.game()
    
});

//The button click events wait for the user to make a choice, and run the appropriate check function to see if the user is right.

$("body").on("click", "#choiceA", function() {
    if ( laW.questionsAsked.length === 10 ) {
        console.log("We are going to the Report")
        laW.gameReport()
    } else {
        laW.checkA()
    }
    
});

$("body").on("click", "#choiceB", function() {
    if ( laW.questionsAsked.length === 10 ) {
        console.log("We are going to the Report")
        laW.gameReport()
    } else {
        laW.checkB()
    }
});

$("body").on("click", "#choiceC", function() {
    if ( laW.questionsAsked.length === 10 ) {
        console.log("We are going to the Report")
        laW.gameReport()
    } else {
        laW.checkC()
    }
});

$("body").on("click", "#choiceD", function() {
    if ( laW.questionsAsked.length === 10 ) {
        console.log("We are going to the Report")
        laW.gameReport()
    } else {
        laW.checkD()
    }
});

$("body").on("click", "#restart", function() {
    console.log("Game is Going to Restart Soon")
    setTimeout(laW.game, 2000)
    laW.gameRestart = false
    $("#report-container").fadeOut(2000)
    $("#clock-container, #question-container, #button-container").delay(2000).fadeIn(2000)
});


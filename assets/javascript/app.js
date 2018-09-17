// This is a Trivia Game App called Guess that Law.

//This game will be coded "on the fly". All html tags and content inside the body section will be generated here,.

// The game is mostly stored in the object laW.

var laW = {

    // This is the question bank for the game. It is a multi-dimensional array.

    questionBank: [
        ["In this state, cannibalism is punishable by up to 14 years in prison, except under \"life threatening conditions\".", "Idaho", "Montana", "Georgia", "That\'s NOT real!"],
        ["In this state, business owners may be fined up to $1,000 for permitting a contest of dwarf-tossing.", "New York", "Florida", "California", "That\'s NOT real!"],
        ["In this state, it is illegal to hold public office if you have fought in a duel with deadly weapons.", "Kentucky", "Texas", "South Carolina", "That\'s NOT real!"],
        ["In this state, it is illegal to pass off Miracle Whip as real Mayonnaise. It must be labeled \"Renovated Mayonnaise\".", "Delaware", "Illinois", "Iowa", "That\'s NOT real!"],
        ["In this state, it is illegal to collect seaweed at night.", "New Hampshire", "Florida", "Oregon", "That\'s NOT real!"],
        ["In this state, a bingo game must not last more than 5 hours, unless it\'s ran by non-profit organization.", "Florida", "Kansas", "North Carolina", "That\'s NOT real!"],
        ["In this state, farmers are permitted to use explosives to protect sunflower crops.", "Florida", "California", "South Dakota", "That\'s NOT real!"],
        ["In this state, hanging a clothesline is prohibited!", "Vermont", "Tennessee", "Idaho", "That\'s NOT real!"],
        ["In this state, it is illegal to substitute a hunting dog for a ferret.", "Wyoming", "West Virginia", "Arkansas", "That\'s NOT real!"],
        ["In this state, it is illegal to feed garbage to pigs without a permit, unless you are raising the pig for your own consumption.", "Missouri", "Arizona", "North Carolina", "That\'s NOT real!"],
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

        if  ( laW.seconds < 0 ) {
            clearInterval(laW.timeCounter)
            laW.timeOuts++
            console.log("timeOuts: " + laW.timeOuts)
            // console.log("We are going on Break")
            // //Take out the game containers
            // $("#clock-container, #question-container, #button-container").fadeOut(1050)
            // laW.gamePhase = false;
            // setTimeout(laW.game, 7000)
            laW.gameBreak("wrong")
        } 
            
    },

    //The gameDisplay and gameRestart functions do setup for the game to either come back or restart depending on which condition is triggered below.

    gameDisplay: function() {
        //Bring in the game containers
        $("#clock-container, #question-container, #button-container, #button-column").fadeIn(1050)
        laW.gamePhase = true
        laW.minutes = "00:"
        laW.seconds = 30
        $("#clock").css("color", "black").css("font-weight", "none")
        $("#graphics").empty()
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
            this.gameBreak("right")
        } else {
            clearInterval(laW.timeCounter)
            this.incorrectAnswers++
            this.gameBreak("wrong")
        }
    },

    checkB: function() {
        console.log("You chose B")
        if ( ( this.qP === 1) || ( this.qP === 8 ) || ( this.qP === 9 ) ) {
            clearInterval(laW.timeCounter)
            this.correctAnswers++
            this.gameBreak("right")
        } else {
            clearInterval(laW.timeCounter)
            this.incorrectAnswers++
            this.gameBreak("wrong")
        }
    },

    checkC: function() {
        console.log("You chose C")
        if ( ( this.qP === 5) || ( this.qP === 6 ) ) {
            clearInterval(laW.timeCounter)
            this.correctAnswers++
            this.gameBreak("right")
        } else {
            clearInterval(laW.timeCounter)
            this.incorrectAnswers++
            this.gameBreak("wrong")
        }
    },

    checkD: function() {
        console.log("You chose D")
        if ( ( this.qP === 3) || ( this.qP === 7 ) ) {
            clearInterval(laW.timeCounter)
            this.correctAnswers++
            this.gameBreak("right")
        } else {
            clearInterval(laW.timeCounter)
            this.incorrectAnswers++
            this.gameBreak("wrong")
        }
    },

    // These are the functions to run either in between questions or at the end of the game. The gameBreak question will also queue up the appropriate content to display during the break.

    gameBreak: function(response) {
        //Take out the game containers
        $("#clock-container, #question-container, #button-column").fadeOut(1050)
        $("#graphics").delay(1050).fadeIn(1050)
        laW.gamePhase = false;
        console.log("We are going on Break")
        console.log("Did you get it Right or Wrong? " + response)

        if ( response === "right" ) {
            $("#graphics").append("<h2>Correct!</h2>")
        } else if ( response === "wrong" ) {
            $("#graphics").append("<h2>Wrong!</h2>")
        }

        if ( laW.qP === 0 ) {
            $("#graphics").append("In Idaho, cannibalism is punishable by up to 14 years in prison, except under \"life threatening conditions\".<br><br><img src=\"https://media.giphy.com/media/3o7TKyVWXoZoW58t9e/giphy.gif\">")
        } else if ( laW.qP === 1 ) {
            $("#graphics").append("In Florida, business owners may be fined up to $1,000 for permitting a contest of dwarf-tossing.<br><br>I<img src=\"https://media.giphy.com/media/nCgACH5pP1Ias/giphy.gif\">")
        } else if ( laW.qP === 2 ) {
            $("#graphics").append("In Kentucky, it is illegal to hold public office if you have fought in a duel with deadly weapons.<br><br><img src=\"https://media.giphy.com/media/C41yP1w3Pe0la/giphy.gif\">")
        } else if ( laW.qP === 3 ) {
            $("#graphics").append("In Iowa, it is illegal to pass off <u>Margarine</u> as real <u>Butter</u>. It must be labeled \"Renovated Butter\".<br><br><img src=\"https://media.giphy.com/media/nQYnLFII2sFcQ/giphy.gif\">")
        } else if ( laW.qP === 4 ) {
            $("#graphics").append("In New Hampshire, it is illegal to collect seaweed at night.<br><br><img src=\"https://media.giphy.com/media/l3q2YZJj7ss1MjOwM/giphy.gif\">")
        }  else if ( laW.qP === 5 ) {
            $("#graphics").append("In North Carolina, a bingo game must not last more than 5 hours, unless it\'s ran by non-profit organization.<br><br><img src=\"https://media.giphy.com/media/l2JhowdrRUIAAzwMU/giphy.gif\">")
        }  else if ( laW.qP === 6 ) {
            $("#graphics").append("In South Dakota, farmers are permitted to use explosives, and fireworks to protect sunflower crops.<br><br><img src=\"https://media.giphy.com/media/rK0Q7ndEM194I/giphy.gif\">")
        }  else if ( laW.qP === 7 ) {
            $("#graphics").append("In Vermont, it is actually illegal to <u>prohibit</u> hanging a clothesline! A clothesline is considered a renewable engergy device.<br><br><img src=\"https://media.giphy.com/media/1X0xKtoeC0L8Q/giphy.gif\">")
        }  else if ( laW.qP === 8 ) {
            $("#graphics").append("In West Virginia, it is illegal to substitute a hunting dog for a ferret.<br><br><img src=\"https://media.giphy.com/media/pPJQvpK6Xslzy/giphy.gif\">")
        }  else if ( laW.qP === 9 ) {
            $("#graphics").append("In Arizona, it is illegal to feed garbage to pigs without a permit, unless you are raising the pig for your own consumption.<br><br><img src=\"https://media.giphy.com/media/xTk9ZvQTzdXx4GE9WM/giphy.gif\">")
        } 
        $("#graphics").delay(5050).fadeOut(1050)

        if ( laW.questionsAsked.length === 10 ) {
            console.log("timeOuts: " + laW.timeOuts)
            console.log("We are going to the Report")
            setTimeout(laW.gameReport, 7000)
        } else {
            setTimeout(laW.game, 7000)
        }
        
    },

    gameReport: function() {
        //Take out the Game Containers
        $("#clock-container, #question-container, #button-container").fadeOut(1050)
        laW.gamePhase = false;
        clearInterval(laW.timeCounter)
        $("#report").text("How Well Do You Know Your Laws??")
        $("#report").append("<div class=\"results\">" + "Your Correct Answers: " + laW.correctAnswers + "</div>")
        $("#report").append("<div class=\"results\">" + "Your Wrong Answers: " + laW.incorrectAnswers + "</div>")
        $("#report").append("<div class=\"results\">" + "Your \"I Didn\'t Even Tries\": " + laW.timeOuts + "</div><br>")
        $("#report").append("<button id=\"restart\">TRY AGAIN</button>")
        //Bring in the Report Container
        $("#report-container").delay().fadeIn(1050)
        laW.questionsAsked = []
        
    },

    

};

//On document load, generate a landing page with a start button. The start button will trigger a function to setup the game.
//This includes making the clock div.

$(document).ready(function() {

    $("body").append("<header class=\"jumbotron jumbotron-fluid\">");
    $(".jumbotron").append("<div class=\"container\" id=\"jumbo\">");
    $("#jumbo").append("<h1 class=\"display-3\">Guess  Who  Made  That  Law!</h1>", "<p class=\"lead\">The funniest trivia game you've never heard of.</p>");

    $("body").append("<section class=\"container\">");
    $("section").append("<div class=\"row\" id=\"clock-container\">");
    $("#clock-container").append("<div class=\"col-12\" id=\"clock\">").fadeOut(0);
    

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
    $("#button-container").append("<div class=\"col-12\" id=\"graphics\">");

    $("main").append("<div class=\"row\" id=\"report-container\">");
    $("#report-container").append("<div class=\"col-12\" id=\"report\">");
    $("report-container").fadeOut(0);
    
    $("#question-container, #button-container, #graphics").fadeOut(0);

    console.log("We are Starting the Game");
    $("#start-container").fadeOut(0);
    $("#clock-container, #question-container, #button-container").fadeIn(1050);

    laW.game()
    
});

//The button click events wait for the user to make a choice, and run the appropriate check function to see if the user is right.

$("body").on("click", "#choiceA", function() {

    laW.checkA()
    
});

$("body").on("click", "#choiceB", function() {
    
    laW.checkB()

});

$("body").on("click", "#choiceC", function() {
    
    laW.checkC()

});

$("body").on("click", "#choiceD", function() {
    
    laW.checkD()

});

$("body").on("click", "#restart", function() {
    console.log("Game is Going to Restart Soon")
    setTimeout(laW.game, 1050)
    laW.gameRestart = false
    $("#report-container").fadeOut(1050)
    $("#clock-container, #question-container, #button-container").delay(1050).fadeIn(1050)
});



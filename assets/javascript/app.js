// This is a Trivia Game App called Guess that Law.

//This game will be coded "on the fly". All html tags and content inside the body section will be generated here,.

// The game is mostly stored in the object laW.

var laW = {

    // This is the question bank for the game. It is a multi-dimensional array.

    questionBank: [
        ["In this state, cannibalism is punishable by up to 14 years in prison, except under \"life threatening conditions\".", "Idaho", "Montana", "Georgia", "That\'s Made UP!"],
        ["In this state, business owners may be fined up to $1,000 for permitting a contest of dwarf-tossing.", "New York", "Florida", "California", "That\'s Made UP!"],
        ["In this state, it is illegal to hold public office if you have fought in a duel with deadly weapons.", "Kentucky", "Texas", "South Carolina", "That\'s Made UP!"],
        ["In this state, it is illegal to drive more than 10 miles under the speed limit.", "Delaware", "Illinois", "Iowa", "That\'s Made UP!"],
        ["In this state, it is illegal to collect seaweed at night.", "New Hampshire", "Florida", "Oregon", "That\'s Made UP!"],
        ["In this state, a bingo game must not last more than 5 hours, unless it\'s ran by non-profit organization.", "Florida", "Kansas", "North Carolina", "That\'s Made UP!"],
        ["In this state, farmers are permitted to use explosives to protect sunflower crops.", "Florida", "California", "South Dakota", "That\'s Made UP!"],
        ["In this state, you can be fined for skiing more than 25 mph without a shirt on.", "Vermont", "Alaska", "Idaho", "That\'s Made UP!"],
        ["In this state, it is illegal to substitute a hunting dog for a ferret.", "Wyoming", "West Virginia", "Arkansas", "That\'s Made UP!"],
        ["In this state, it is illegal to feed garbage to pigs without a permit, unless you are raising the pig for your own consumption.", "Missouri", "Arizona", "North Carolina", "That\'s Made UP!"],
        ["In this state, there is a law on the books banning driving while blindfolded.", "New Mexico", "Maine", "Alabama", "That\'s Made UP!"],
        ["In this state, it is illegal to throw a pizza at someone.", "New York", "Louisiana", "Illinois", "That\'s Made UP!"],
    ],

    // Setup initial variables. correctAnswers, incorrectAnswers, and timeOuts are used for the final report. 
    // Questions asked keeps questions from being repeated, and qP is used in random selection.

    correctAnswers: 0,
    incorrectAnswers: 0,
    percentage: "",
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

        //Count down the timer and turn the numbers red when it gets down to single digits.

        if ( laW.seconds < 10 ) {
            laW.minutes = "00:0"
            $("#clock").css("color", "red").css("font-weight", "bold")
        }
        $("#clock").text(" " + laW.minutes + laW.seconds + " ")
        laW.seconds--

        //If the clock runs out, add one to the incorret answers and go to break.

        if  ( laW.seconds < 0 ) {
            clearInterval(laW.timeCounter)
            laW.incorrectAnswers++
            laW.gameBreak("wrong")
        } 
            
    },

    //The gameDisplay and gameRestart functions do setup for the game to either come back or restart depending on which condition is triggered below.

    gameDisplay: function() {

        //Take out the title and footer
        $("#jumbo, #jumbo-footer").slideUp(1050);

        //Bring in the game containers
        $("#clock-container, #question-container, #button-container, #button-column").fadeIn(1050)

        // Reset some things that may have been changed by the break or finshed game sections.
        laW.gamePhase = true
        laW.minutes = "00:"
        laW.seconds = 30
        $("#clock").css("color", "black").css("font-weight", "none")
        $("#graphics-title, #graphics-content").empty()
    },

    //The game function pulls a question from the questionBank array and populates the page. It also begins a new countdown.

    game: function() {

        //The first step of the game is to check a condition: is the game coming back from break or restart? There are some settings to run if either are true, listed directly above.

        if ( laW.gamePhase == false ) {
            console.log("We are coming back from break")
            laW.gameDisplay()
        }

        //The second step is to pull a random question, and make sure it hasn't been shown yet. The timer starts once a "new" question is found.

        laW.qP = Math.floor(Math.random()*laW.questionBank.length )

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

    //The check functions are what process the user input. 
    //They check for the condition that choosing "their" button was the right button, log the score, and then they send the game to break.

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
        if ( ( this.qP === 5) || ( this.qP === 6 ) || ( this.qP === 10 ) ) {
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
        if ( ( this.qP === 3) || ( this.qP === 7 ) || ( this.qP === 11) ) {
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
        //And bring in the graphics
        $("#graphics-title, #graphics-content").delay(1050).fadeIn(1050)
        //Set the game phase because we are going to change some temporary things.
        laW.gamePhase = false;
        console.log("We are going on Break")
        console.log("Did you get it Right or Wrong? " + response)

        //Log whether the anser chosen was right or wrong.
        if ( response === "right" ) {
            $("#graphics-title").append("<h2>Correct!</h2>")
        } else if ( response === "wrong" ) {
            $("#graphics-title").append("<h2>Wrong!</h2>")
        }

        //Display the correct answer response and graphic for the question.
        if ( laW.qP === 0 ) {
            $("#graphics-content").append("In Idaho, cannibalism is punishable by up to 14 years in prison, except under \"life threatening conditions\" Pick your hiking buddy carefully!<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/3o7TKyVWXoZoW58t9e/giphy.gif\">")
        } else if ( laW.qP === 1 ) {
            $("#graphics-content").append("In Florida, business owners may be fined up to $1,000 for permitting a contest of dwarf-tossing. You thought it was New York, didn't you?<br><br>I<img class=\"gif\" src=\"https://media.giphy.com/media/nCgACH5pP1Ias/giphy.gif\">")
        } else if ( laW.qP === 2 ) {
            $("#graphics-content").append("In Kentucky, it is illegal to hold public office if you have fought in a duel with deadly weapons. Only passive aggression is allowed from politicians!<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/C41yP1w3Pe0la/giphy.gif\">")
        } else if ( laW.qP === 3 ) {
            $("#graphics-content").append("That\'s MADE up! But you might wanna know, that in Iowa, it is illegal to pass off <u>Margarine</u> as real <u>Butter</u>. It must be labeled \"Renovated Butter\".<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/nQYnLFII2sFcQ/giphy.gif\">")
        } else if ( laW.qP === 4 ) {
            $("#graphics-content").append("In New Hampshire, it is illegal to collect seaweed at night. But why??<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/l3q2YZJj7ss1MjOwM/giphy.gif\">")
        }  else if ( laW.qP === 5 ) {
            $("#graphics-content").append("In North Carolina, a bingo game must not last more than 5 hours, unless it\'s ran by non-profit organization. It's dangerous to play games for a long time without a break you know.<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/l2JhowdrRUIAAzwMU/giphy.gif\">")
        }  else if ( laW.qP === 6 ) {
            $("#graphics-content").append("In South Dakota, farmers are permitted to use explosives, and fireworks to protect sunflower crops. Get off my farm! <br><br><img class=\"gif\" src=\"https://media.giphy.com/media/rK0Q7ndEM194I/giphy.gif\">")
        }  else if ( laW.qP === 7 ) {
            $("#graphics-content").append("That\'s MADE up! But you might wanna know, that in Vermont, it is illegal to prohibit solar panels and clotheslines! Talk about dedication to reneweable energy!<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/1X0xKtoeC0L8Q/giphy.gif\">")
        }  else if ( laW.qP === 8 ) {
            $("#graphics-content").append("In West Virginia, it is illegal to substitute a hunting dog for a ferret. This right here is a hunting ferret, woof woof.<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/pPJQvpK6Xslzy/giphy.gif\">")
        }  else if ( laW.qP === 9 ) {
            $("#graphics-content").append("In Arizona, it is illegal to feed garbage to pigs without a permit, unless you are raising the pig for your own consumption. <u>Bacon is Bacon.</u><br><br><img class=\"gif\" src=\"https://media.giphy.com/media/xTk9ZvQTzdXx4GE9WM/giphy.gif\">")
        }  else if ( laW.qP === 10 ) {
            $("#graphics-content").append("In Alabama, it is illegal to drive blindfolded. Keep your eyes on the road, duh!<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/rW93tN5vISkjC/giphy.gif\">")
        }  else if ( laW.qP === 11 ) {
            $("#graphics-content").append("That\s MADE up! But you should know, that in Louisiana, it is illegal to surprise someone with a pizza. Plan ahead!<br><br><img class=\"gif\" src=\"https://media.giphy.com/media/3o7bu2E3Bp1GhOdTmU/giphy.gif\">")
        } 

        //Take the graphics back out.
        $("#graphics-title, #graphics-content").delay(8050).fadeOut(1050)

        //Check before going back to the game if we have run out of questions. If true, run the game Report.
        if ( laW.questionsAsked.length === laW.questionBank.length ) {
            console.log("timeOuts: " + laW.timeOuts)
            console.log("We are going to the Report")
            setTimeout(laW.gameReport, 10000)
        } else {
            setTimeout(laW.game, 10000)
        }
        
    },

    gameReport: function() {
        //Bring back the title and footer
        $("#jumbo, #jumbo-footer").slideDown(1050);
        //Take out the Game Containers
        $("#clock-container, #question-container, #button-container").fadeOut(1050)

        //Set the game phase because we are going to change some temporary stuff.
        laW.gamePhase = false;
        clearInterval(laW.timeCounter)

        //append the report items to the page.
        $("#report").text("How Well Do You Know Your Laws??")
        $("#report").append("<div class=\"results\" id=\"score-percent\">You got: " +  laW.correctAnswers / laW.questionBank.length * 100 + "%</div>")
        $("#report").append("<div class=\"results\">" + "That Is " + laW.correctAnswers + " Correct Answers</div>")
        $("#report").append("<div class=\"results\">" + "And " + laW.incorrectAnswers + " Wrong Answers</div>")
        $("#report").append("<button id=\"restart\">TRY AGAIN</button>")
        //And bring in the Report Container
        $("#report-container").delay().fadeIn(1050)
        laW.questionsAsked = []
        
    },

    

};

//On document load, generate a landing page with a start button. The start button will trigger a function to setup the game.
//This includes making the clock div.

$(document).ready(function() {  

    //First add the title Jumbotron
    $("body").append("<header class=\"jumbotron jumbotron-fluid\">");
    $(".jumbotron").append("<div class=\"container\" id=\"jumbo\">");
    $("#jumbo").append("<h1 class=\"display-3\">Guess  Who  Made  That  Law!</h1>", "<p class=\"lead\">The funniest trivia game you've never heard of.</p>");
    $(".jumbotron").append("<div class=\"spacer\">")

    //Then, add the clock
    $("body").append("<section class=\"container\">");
    $("section").append("<div class=\"row\" id=\"clock-container\">");
    $("#clock-container").append("<div class=\"col-12\" id=\"clock\">").fadeOut(0);

    //Then, add the start button
    $("body").append("<main class=\"container\">");
    $("main").append("<div class=\"row\" id=\"start-container\">");
    $("#start-container").append("<div class=\"col-12\" id=\"start-column\">");
    $("#start-column").append("<button class=\"start-game\">Start Game</button>")

    //Then, add the footer
    $("body").append("<footer class=\"jumbo-bottom\">");
    $(".jumbo-bottom").append("<div class=\"spacer\" id=\"footer-space\">")
    $(".jumbo-bottom").append("<div class=\"container\" id=\"jumbo-footer\">");
    $("#jumbo-footer").append("<p class=\"lead\">&copy; Kyle Rosenmeyer</p>");

    console.log("The Game is Ready to Start")

});

//Clicking the start button will transition to question 1.
//This creates the question div and 4 answer buttons to choose from.

$("body").on("click", "button.start-game", function() {

    //Move up the title and bring down the footer
    $("#jumbo, #jumbo-footer").slideUp(1050);
    $(".jumbotron").css("padding", "10px");
    //Add the question
    $("main").append("<div class=\"row\" id=\"question-container\">");
    $("#question-container").append("<div class=\"col-12\" id=\"question\">");

    //Add the answer buttons and the graphics section.
    $("main").append("<div class=\"row\" id=\"button-container\">");
    $("#button-container").append("<div class=\"col-12\" id=\"button-column\">");
    $("#button-column").append("<button id=\"choiceA\">", "<button id=\"choiceB\">", "<button id=\"choiceC\">", "<button id=\"choiceD\">");
    $("#button-container").append("<div class=\"col-12\" id=\"graphics-title\">");
    $("#button-container").append("<div class=\"col-12\" id=\"graphics-content\">");

    //Add the report section
    $("main").append("<div class=\"row\" id=\"report-container\">");
    $("#report-container").append("<div class=\"col-12\" id=\"report\">");
    $("report-container").fadeOut(0);
    
    //Immediatly hide the question, answer buttons, and graphics.
    $("#question-container, #button-container, #graphics-title, #graphics-content").fadeOut(0);
  
    //As the game starts, hide the start button and bring in the clock, question, and answer buttons.
    console.log("We are Starting the Game");
    $("#start-container").fadeOut(0);
    $("#clock-container, #question-container, #button-container").fadeIn(1050);

    //launch the game.
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


//At the game end, get things ready to start the game again.
$("body").on("click", "#restart", function() {
    console.log("Game is Going to Restart Soon")
    setTimeout(laW.game, 1050)
    $("#report-container").fadeOut(1050)
    $("#clock-container, #question-container, #button-container").delay(1050).fadeIn(1050)
});



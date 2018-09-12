// This is a Trivia Game App called Useless Facts.

//This game will be coded "on the fly". All html tags and content inside the body section will be generated here,.

//Game Outline:

//On document load, generate a landing page with a start button. The start button will trigger a function to start the game.

//Challenge: try to wrap as much of the code below as possible into an object. This may not be possible where scope issues develop.

//10 Questions, each stored in it's one array called "questionX"
//Index 0 will be the question, and Index 1-4 will be the options to choose.
//A boolean will be initially set to tie to the selection condition for the question displayed. 
//Variables for Correct, Incorrect, and Timedout answers will be created to store values.

//An interval with a setTimeout feature will wrap the below logic to give the user a limited time to answer each question.
//And start a countdown clock.

//Four buttons on the screen will be set with ID's #selectA, #selectB, #selectC, and #selectD.
//For each question that comes up on the screen, a condition will be checked for the user targeting the correct button ID. 
//The action of the if condition will flip a boolean (to end that selection phase of the question) and run the display pieces accordingly.//#endregion
//The action will also udpate the interval, and timout features to prepare for the next question.
//The action will also increment the appropriate variable to keep score for the game.

//Once the interval has been completed (meeting a condition), the results of the game will be displayed.
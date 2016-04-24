"use strict";

//creating the object type: Question
function Question(questionText, answers) {
    this.questionText = questionText;
    this.answers = answers;
}

var questionWrapper = document.getElementById("question-wrapper");
var feedback = document.getElementById("feedback");
var answersWrapper = document.getElementById("answers-wrapper");
var startAgainWrapper = document.getElementById("start-again-wrapper");


//setting the starting Question number and scores (one per personality type) to 0
var currentQuestion = 0;
var scoreA = 0;
var scoreB = 0;
var scoreC = 0;
var scoreD = 0;

// store user answers in an array - might use this for customising feedback
// var userAnswers = new Array(); 

// creating an Array of Questions
var allTheQuestions = new Array();
allTheQuestions.push(new Question("Personality quiz question 1", ["Q1 Answer A", "Q1 Answer B", "Q1 Answer C", "Q1 Answer D"]));
allTheQuestions.push(new Question("Personality quiz question 2", ["Q2 Answer A", "Q2 Answer B", "Q2 Answer C", "Q2 Answer D"]));
allTheQuestions.push(new Question("Personality quiz question 3", ["Q3 Answer A", "Q3 Answer B", "Q3 Answer C", "Q3 Answer D"]));
allTheQuestions.push(new Question("Personality quiz question 4", ["Q4 Answer A", "Q4 Answer B", "Q4 Answer C", "Q4 Answer D"]));

// making the current Question appear on the page, ensuring no answers are pre-selected
function setQuestion(questionNumber) {

    while (answersWrapper.hasChildNodes()) {
        answersWrapper.removeChild(answersWrapper.lastChild);
    }

    var questionDiv = document.getElementById("question");
    questionDiv.innerHTML = allTheQuestions[questionNumber].questionText;

    // Store all the answers associated with the current Question  
    var questionAllAnswers = allTheQuestions[questionNumber].answers;

    // Loop through the answers one by one and display them  
    for (var i = 1; i <= questionAllAnswers.length; i++) {

        var answerDiv = document.createElement('div');

        var quizRadio = document.createElement('input');
        quizRadio.type = 'radio';
        quizRadio.name = 'answer';
        quizRadio.className = 'quiz-radio';
        quizRadio.id = 'answer' + i;

        var quizRadioLabel = document.createElement('label');
        quizRadioLabel.className = 'quiz-label';
        quizRadioLabel.htmlFor = 'answer' + i;
        quizRadioLabel.id = 'answer' + i + 'label';
        quizRadioLabel.innerText = questionAllAnswers[i - 1];

        answerDiv.appendChild(quizRadio);
        answerDiv.appendChild(quizRadioLabel);
        answersWrapper.appendChild(answerDiv);

    }

    // if we're on any Question other than Question 1, show the start again button 
    if (currentQuestion >= allTheQuestions.length - 4) {

        while (startAgainWrapper.hasChildNodes()) {
            startAgainWrapper.removeChild(startAgainWrapper.lastChild);
        }

        var startAgainButton = document.createElement("input");
        startAgainButton.type = 'button';
        startAgainButton.className = 'quiz-button';
        startAgainButton.id = 'start-again-button'
        startAgainButton.value = "Start again \u203a\u203a"
        startAgainButton.onclick = function () {
            userAnswers.length = 0;
            score = 0;
            displayNewQuestion(0);
        };

        startAgainWrapper.appendChild(startAgainButton);

    }

    // if we're on the last question, change the next button text
    if (currentQuestion === allTheQuestions.length - 1) {
        document.getElementById("next-button").value = "Show me the results";
    }
}

function displayNewQuestion(questionNumber) {
    $("#question-wrapper").fadeOut("slow", function () {
        setQuestion(questionNumber);
        $("#question-wrapper").fadeIn("slow");
    });
}

// setting up the check answers function, which is triggered every time the user clicks the Next Question button
function checkAnswer() {
    var answerAselected = document.getElementById('answer1').checked;
    var answerBselected = document.getElementById('answer2').checked;
    var answerCselected = document.getElementById('answer3').checked;
    var answerDselected = document.getElementById('answer4').checked;

    // userAnswers.push(correctAnswerSelected); keep for customising results text later

    if (answerAselected) {
        scoreA++;
    }

    if (answerBselected) {
        scoreB++;
    }

    if (answerCselected) {
        scoreC++;
    }

    if (answerDselected) {
        scoreD++;
    }
}

// revealing the results
function showResults() {

    questionWrapper.innerHTML = " ";

    var largest = Math.max(scoreA, scoreB, scoreC, scoreD);
    if (scoreA == largest) {
        feedback.innerHTML = "A score:" + scoreA + "<br />" + "B score:" + scoreB + "<br />" + "C score:" + scoreC + "<br />" + "D score:" + scoreD + "<br />" + "Your dominant personality type is A";
    }

    else if (scoreB == largest) {
        feedback.innerHTML = "A score:" + scoreA + "<br />" + "B score:" + scoreB + "<br />" + "C score:" + scoreC + "<br />" + "D score:" + scoreD + "<br />" + "Your dominant personality type is B";
    }
    else if (scoreC == largest) {
        feedback.innerHTML = "A score:" + scoreA + "<br />" + "B score:" + scoreB + "<br />" + "C score:" + scoreC + "<br />" + "D score:" + scoreD + "<br />" + "Your dominant personality type is C";
    }

    else if (scoreD == largest) {
        feedback.innerHTML = "A score:" + scoreA + "<br />" + "B score:" + scoreB + "<br />" + "C score:" + scoreC + "<br />" + "D score:" + scoreD + "<br />" + "Your dominant personality type is D";
    }
    else {
        feedback.innerHTML = "A score:" + scoreA + "<br />" + "B score:" + scoreB + "<br />" + "C score:" + scoreC + "<br />" + "D score:" + scoreD + "<br />" + "Something else happened";
    }

    /*
    questionWrapper.innerHTML = " ";
    feedback.innerHTML = "You scored " + ((score / allTheQuestions.length) * 100) + "%";

    for (var i = 0; i < allTheQuestions.length; i++) {

        var response = document.createElement('div');
        response.className = 'response';
        response.innerText = 'You answered question ' + (i + 1) + ' ';

        var answer_span = document.createElement('span');

        if (userAnswers[i]) {
            answer_span.className = 'quiz-correct-answer';
            answer_span.innerText = 'correctly';
            response.appendChild(answer_span);
            response.appendChild(document.createTextNode('.'));
        }
        else {
            var correctAnswerValue = allTheQuestions[i].correctAnswer - 1;
            var correctAnswerText = allTheQuestions[i].answers[correctAnswerValue];
            answer_span.className = 'quiz-incorrect-answer';
            answer_span.innerText = 'incorrectly';
            response.appendChild(answer_span);
            response.appendChild(document.createTextNode('.'))
            var correctAnswerReveal = document.createTextNode(' The correct answer is ' + correctAnswerText);
            response.appendChild(correctAnswerReveal);
        }

        feedback.appendChild(response);

        
    }
*/
}

function hasUserSelectedAnAnswer() {

    var numberofAnswers = allTheQuestions[currentQuestion].answers.length;

    for (var i = 1; i <= numberofAnswers; i++) {
        if (document.getElementById('answer' + i).checked) {
            // if false, doesn't return ANYTHING. Moves on to next answer radio button
            // when the statement evaluates to true, evaluates hasUserSelectedAnAnswer as true in this instance and stops running the loop. Done!
            return true;
        }
    }
    // By this point, the loop has looked at every radio button and still not found one that has been checked. Therefore, the statement must be false.
    return false;
}

function nextQuestion() {

    if (!hasUserSelectedAnAnswer()) {
        return;
    }

    checkAnswer();

    // if there are any more questions to be shown to the user, set the next question, then exit
    if (currentQuestion < allTheQuestions.length - 1) {

        currentQuestion++;
        displayNewQuestion(currentQuestion);
        return;
    }

    // if we're on the last question, show final score when they click the next button
    if (currentQuestion === allTheQuestions.length - 1) {
        showResults();
    }

}



displayNewQuestion(0);
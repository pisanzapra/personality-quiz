"use strict";

// creating the object type: Question
function Question(questionText, answers) {
    this.questionText = questionText;
    this.answers = answers;
}

// creating the object type: Result
function Result(title, image, description) {
    this.title = title;
    this.image = image;
    this.description = description;
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

var userAnswers = new Array();

// creating an Array of Questions
var allTheQuestions = new Array();
allTheQuestions.push(new Question("The text for the question will appear here. This is where the text for the question will appear.", ["Q1 Answer A", "Q1 Answer B", "Q1 Answer C", "Q1 Answer D"]));
allTheQuestions.push(new Question("Personality quiz question 2", ["Q2 Answer A", "Q2 Answer B", "Q2 Answer C", "Q2 Answer D"]));
allTheQuestions.push(new Question("Personality quiz question 3", ["Q3 Answer A", "Q3 Answer B", "Q3 Answer C", "Q3 Answer D"]));
allTheQuestions.push(new Question("Personality quiz question 4", ["Q4 Answer A", "Q4 Answer B", "Q4 Answer C", "Q4 Answer D"]));

// creating an Array of Results
var allTheResults = new Array();
allTheResults.push(new Result("Personality A", "image-a.jpg", "Description of Personality A here"));
allTheResults.push(new Result("Personality B", "image-b.jpg", "Description of Personality B here"));
allTheResults.push(new Result("Personality C", "image-c.jpg", "Description of Personality C here"));
allTheResults.push(new Result("Personality D", "image-d.jpg", "Description of Personality D here"));

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
        quizRadioLabel.innerHTML = questionAllAnswers[i - 1];

        answerDiv.appendChild(quizRadio);
        answerDiv.appendChild(quizRadioLabel);
        answersWrapper.appendChild(answerDiv);

    }

    // if we're on the last question, change the next button text
    if (currentQuestion === allTheQuestions.length - 1) {
        document.getElementById("next-button").value = "Show me my result!";
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



function revealPersonality(largestType) {
    feedback.innerHTML = "Your dominant personality type is " + largestType.title;
    var resultImage = document.createElement('div');
    resultImage.classname = 'result-image';
    resultImage.innerHTML = "<img src='" + largestType.image + "' />";
    feedback.appendChild(resultImage);
    var resultDescription = document.createElement('div');
    resultDescription.classname = 'result-description';
    resultDescription.innerHTML = largestType.description;
    feedback.appendChild(resultDescription);
}


// revealing the results
function showResults() {

    questionWrapper.innerHTML = " ";

    var largest = Math.max(scoreA, scoreB, scoreC, scoreD);

    if (scoreA == largest) {
        revealPersonality(allTheResults[0]);
    }

    else if (scoreB == largest) {
        revealPersonality(allTheResults[1]);
    }
    else if (scoreC == largest) {
        revealPersonality(allTheResults[2]);
    }

    else if (scoreD == largest) {
        revealPersonality(allTheResults[3]);
    }
    else {
        feedback.innerHTML = "Oops! Something went wrong there";
    }
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

window.fbAsyncInit = function () {
    FB.init({
        appId: '1722679911277589',
        xfbml: true,
        version: 'v2.6'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));


function feedDialog(resultName, resultDescription, resultCaption, resultImage) {
    FB.ui(
        {
            method: 'feed',
            name: resultName,
            link: window.location.href,
            description: resultDescription,
            caption: resultCaption,
            picture: resultImage,
            /*display: 'popup'*/
        },
        function (response, show_error) {
            if (response && response.post_id) {
                console.log('Post was published.');
            } else {
                console.log('Post was not published.');
            }
        }
    );
}

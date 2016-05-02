"use strict";

// creating the object type: Question
function Question(questionText, answers) {
    this.questionText = questionText;
    this.answers = answers;
}

// creating the object type: Answer
function Answer(answerText, scoreGroups) {
    this.answerText = answerText;
    this.scoreGroups = scoreGroups;
}

// creating the object type: Result
function Result(title, image, description) {
    this.title = title;
    this.image = image;
    this.description = description;
}

var questionWrapper = document.getElementById("question-wrapper");
var feedback = document.getElementById("feedback");
var answersWrapper = document.getElementById("answers");

//setting the starting Question number and scores (one per personality type) to 0
var currentQuestion = 0;
var scoreA = 0;
var scoreB = 0;
var scoreC = 0;
var scoreD = 0;

var userAnswers = new Array();

// creating an Array of Questions
var allTheQuestions = new Array();
allTheQuestions.push(
    new Question(
        "The text for the question will appear here. This is where the text for the question will appear.",
        [
            new Answer("Q1 Answer A", ["A"]),
            new Answer("Q1 Answer B", ["B"]),
            new Answer("Q1 Answer C", ["C"]),
            new Answer("Q1 Answer D", ["D", "A"])
        ]));
allTheQuestions.push(
    new Question(
        "Personality quiz question 2",
        [
            new Answer("Q1 Answer A", ["A"]),
            new Answer("Q1 Answer B", ["B"]),
            new Answer("Q1 Answer C", ["C"]),
            new Answer("Q1 Answer D", ["D"])
        ]));
allTheQuestions.push(
    new Question(
        "Personality quiz question 3",
        [
            new Answer("Q1 Answer A", ["A"]),
            new Answer("Q1 Answer B", ["B"]),
            new Answer("Q1 Answer C", ["C"]),
            new Answer("Q1 Answer D", ["D"])
        ]));
allTheQuestions.push(
    new Question(
        "Personality quiz question 4",
        [
            new Answer("Q1 Answer A", ["A"]),
            new Answer("Q1 Answer B", ["B"]),
            new Answer("Q1 Answer C", ["C"]),
            new Answer("Q1 Answer D", ["D"])
        ]));

// creating an Array of Results
var allTheResults = new Array();
allTheResults.push(new Result("Personality A", "http://www.bygabriella.co.uk/xyz/image-a.jpg", "Description of Personality A here"));
allTheResults.push(new Result("Personality B", "http://www.bygabriella.co.uk/xyz/image-b.jpg", "Description of Personality B here"));
allTheResults.push(new Result("Personality C", "http://www.bygabriella.co.uk/xyz/image-c.jpg", "Description of Personality C here"));
allTheResults.push(new Result("Personality D", "http://www.bygabriella.co.uk/xyz/image-d.jpg", "Description of Personality D here"));

// shuffle an array
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

// making the current Question appear on the page, ensuring no answers are pre-selected
function setQuestion(questionNumber) {

    while (answersWrapper.hasChildNodes()) {
        answersWrapper.removeChild(answersWrapper.lastChild);
    }

    var questionDiv = document.getElementById("question");
    questionDiv.innerHTML = allTheQuestions[questionNumber].questionText;

    // Store all the answers associated with the current Question  
    var questionAllAnswers = allTheQuestions[questionNumber].answers;

    //
    var answerOrder = [];
    for (var i = 0; i < questionAllAnswers.length; i++) {
        answerOrder.push(i);
    }
    shuffle(answerOrder);

    // Loop through the answers one by one and display them  
    for (var i = 0; i < answerOrder.length; i++) {
        var currentAnswerIndex = answerOrder[i];

        var answerDiv = document.createElement('div');

        var quizRadio = document.createElement('input');
        quizRadio.type = 'radio';
        quizRadio.name = 'answer';
        quizRadio.className = 'quiz-radio';
        quizRadio.id = 'answer' + i;
        quizRadio.value = questionAllAnswers[currentAnswerIndex].scoreGroups.join(',');

        var quizRadioLabel = document.createElement('label');
        quizRadioLabel.className = 'quiz-label';
        quizRadioLabel.htmlFor = 'answer' + i;
        quizRadioLabel.id = 'answer' + i + 'label';
        quizRadioLabel.innerHTML = questionAllAnswers[currentAnswerIndex].answerText;

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
    var selectedScoreGroups = document.querySelector('input[name="answer"]:checked').value.split(',');

    for (var i = 0; i < selectedScoreGroups.length; i++) {
        switch (selectedScoreGroups[i]) {
            case "A":
                scoreA++;
                break;
            case "B":
                scoreB++;
                break;
            case "C":
                scoreC++;
                break;
            case "D":
                scoreD++;
                break;
        }
    }
}

function shareToFacebook() {
    var dominantPersonality = getDominantPersonality();
    feedDialog(dominantPersonality.title, dominantPersonality.description, dominantPersonality.caption, dominantPersonality.image);
}


function revealPersonality(largestType) {

    var resultTitle = document.getElementById("result-title");
    var resultImage = document.getElementById('result-image');
    var resultDescription = document.getElementById('result-description');
    resultTitle.innerHTML = "Your dominant personality type is " + largestType.title;
    resultImage.src = largestType.image;
    resultDescription.innerHTML = largestType.description;
    $("#feedback").show();
}

function getDominantPersonality() {

    var largest = Math.max(scoreA, scoreB, scoreC, scoreD);

    if (scoreA == largest) {
        return allTheResults[0];
    }
    else if (scoreB == largest) {
        return allTheResults[1];
    }
    else if (scoreC == largest) {
        return allTheResults[2];
    }
    else if (scoreD == largest) {
        return allTheResults[3];
    }
    else {
        return null;
    }

}


// revealing the results
function showResults() {

    questionWrapper.innerHTML = " ";

    var dominantPersonality = getDominantPersonality();

    revealPersonality(dominantPersonality);

    // just for the sake of debugging    
    console.log("A: " + scoreA);
    console.log("B: " + scoreB);
    console.log("C: " + scoreC);
    console.log("D: " + scoreD);
}

function hasUserSelectedAnAnswer() {
    // browser returns all checked answers, code checks length of array is one - if so, returns true
    return document.querySelectorAll('input[name="answer"]:checked').length == 1;
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

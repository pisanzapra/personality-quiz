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
var scoreA = 0; // Florence
var scoreB = 0; // Vancouver
var scoreC = 0; // Tokyo
var scoreD = 0; // Edinburgh

var userAnswers = new Array();

// creating an Array of Questions
var allTheQuestions = new Array();
allTheQuestions.push(
    new Question(
        "Which food can you not get enough of?",
        [
            new Answer("Pizza", ["A"]),
            new Answer("Burgers", ["B"]),
            new Answer("Sushi", ["C"]),
            new Answer("I like a variety of foods", ["D"])
        ]));
allTheQuestions.push(
    new Question(
        "Would you be happy to learn the basics of a new language in preparation for your trip?",
        [
            new Answer("No, I don't want to waste time bothering with that", ["B", "C"]),
            new Answer("Of course, it's an essential part of the experience for me", ["A", "C"])
        ]));
allTheQuestions.push(
    new Question(
        "How do you handle crowds?",
        [
            new Answer("Hate them! Get me away from all the noise", ["A", "D"]),
            new Answer("Love them! I thrive on the buzz of big cities", ["B", "C"])
        ]));
allTheQuestions.push(
    new Question(
        "What's your favourite thing about being on holiday?",
        [
            new Answer("Admiring works of art and learning all about the history of a new place", ["A"]),
            new Answer("The night life - there's nothing I love more than stumbling across an interesting bar or seeing a new play", ["D"]),
            new Answer("Exploring the great outdoors and photographing beautiful scenery", ["B"]),
            new Answer("Simply walking around and noticing the little things that make a place unique", ["C"])
        ]));
allTheQuestions.push(
    new Question(
        "What kind of weather are you hoping for on your trip?",
        [
            new Answer("Hot and sunny of course - it's summer!", ["A", "C"]),
            new Answer("Warm but mild, please. I can't cope with excessive amounts of sun", ["B"]),
            new Answer("I don't mind. Hell, give me a bit of rain for all I care", ["D"])
        ]));

// creating an Array of Results
var allTheResults = new Array();
allTheResults.push(
    new Result(
        "Florence",
        "images/florence.jpg",
        "Pizza, art, history - what's not to like about Florence? And with temperatures averaging around 28 degrees in the peak of summer, you can soak up the sun as well as the local culture."
    ));
allTheResults.push(
    new Result("Vancouver",
        "images/vancouver.jpg",
        "Set against the backdrop of the Rocky Mountains, Vancouver is one of the world's most beautiful cities. Whether it's a bike ride along the Stanley Park sea wall, shopping on Robson Street or a trip to Grouse Mountain to see the bears, there's sure to be something to make you fall in love with BC's capital."
    ));
allTheResults.push(
    new Result(
        "Tokyo",
        "images/tokyo.jpg",
        "There's so much to see in this vibrant city. Just walking around and noticing all the wacky themed restaurants, quirky fashions and massive malls is an experience in itself. As well as being a skyscraper jungle and capital of consumerism though, Tokyo also offers visitors opportunities to encounter the serene side of traditional Japan."
    ));
allTheResults.push(
    new Result(
        "Edinburgh",
        "images/edinburgh.jpg",
        "Edinburgh is the perfect staycation destination. There's no need to carry around a phrase book, but this Scottish city has plenty to make it a worthy tourist hotspot. During the day, visit the stunning Edinburgh castle or go hiking up the famous Arthur's Seat. Come evening, have a pint in one of the city's unusual bars or experience Edinburgh's thriving comedy scene."));

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
    resultTitle.innerHTML = "Your ideal summer holiday destination is " + largestType.title;
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
            name: "I got " + resultName + "! What's your ideal summer holiday destination?",
            link: window.location.href,
            description: "Click here to take the quiz and find out!",
            caption: resultCaption,
            picture: window.location.href + resultImage,
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

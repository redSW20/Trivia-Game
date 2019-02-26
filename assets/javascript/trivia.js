$(document).ready(function() {
    //Variables to be used throughout the script
    let userGuess;
    let currentQuestion;
    let correctAnswer;
    let incorrectAnswer;
    let unanswered;
    let answered;
    let gameTime;
    let seconds;

    // Questions, possible answers, and correct answers in object array
    let questions = [{
        question: 'What is the first step in replacing spark plugs after shutting the car off??',
        answers: ['Pull spark plug wire or coil pack', 
                  'Remove spark plugs', 
                  'Open hood of car', 
                  'Take to mechanic'],
        answer: 2
    }
    ,{
        question: 'How do you change a tire?',
        answers: ['Raise car with jack, Loosen and remove lugnuts, Take wheel off, Put spare on, Replace and retighten lugnuts, Lower car off jack', 
                  'Take to mechanic', 
                  'Use a knife to take the tire off the rim', 
                  'Loosen lugnuts, Raise car with jack, Remove lugnuts and wheel, Place spare in place of original, Handtighten lugnuts so wheel is snug, Lower car off jack, Torque down lugnuts'],
        answer: 3
    },{
        question: 'How do you change the oil in your car?',
        answers: ['', 
                  '', 
                  '', 
                  ''],
        answer: 0
    },{
        question: '?',
        answers: ['', 
                  '', 
                  '', 
                  ''],
        answer: 2
    },{
        question: '?',
        answers: ['', 
                  '', 
                  '', 
                  ''],
        answer: 2
    },{
        question: '?',
        answers: ['', 
                  '', 
                  '', 
                  ''],
        answer: 3
    },{
        question: '?',
        answers: ['', 
                  '', 
                  '', 
                  ''],
        answer: 3
    },{
        question: '?',
        answers: ['', 
                  '', 
                  '', 
                  ''],
        answer: 2
    },{
        question: '?',
        answers: ['', 
                  '', 
                  '', 
                  ''],
        answer: 2
    }
    ,{
        question: '?',
        answers: ['', 
                  '', 
                  '', 
                  ''],
        answer: 1
    }];

    // Functions for Game //

    // RenderGame function starts game after "start-button" and "restart-button" click.
    function renderGame() {
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        $('#quiz-question-page').show();
        $('#quiz-answer-page').hide();
        $('#quiz-intro-page').hide();
        newQuestion();
    }
    // Generates new question, then answers using a for loop as well as click listener.
    function newQuestion() {
        answered = true;
        $('#game-alert').empty();
        $('#answer-image').empty();
        $('#correct-answer-text').empty();
        $('#question').html('<h2>' + questions[currentQuestion].question + '</h2>');

        for (let i = 0; i < 4; i++) {
            let possibleAnswers = $('<button>');
            possibleAnswers.text(questions[currentQuestion].answers[i]);
            possibleAnswers.attr({'data-ninja':i});
            possibleAnswers.addClass('answer-button list-group-item list-group-item-action list-group-item-primary font-weight-bold text-white');
            $('#answer-list').append(possibleAnswers);
        }

        gameTimer();

        $('.answer-button').on('click', function() {
            userGuess = $(this).data('ninja');
            clearInterval(gameTime);
            answerCheck();
        });
    }

    //timers and progress bar
    function gameTimer(){
        seconds = 20;
        answered = true;
        gameTime = setInterval(displayTimer, 1000);
    }
    function displayTimer(){
        seconds--;
        $('#time-remaining').html('Time Remaining: ' + seconds);
        $("#progressBar")[0].value = 20 - seconds;


        if (seconds <= 0){
            clearInterval(gameTime);
            answered = false;
            answerCheck();
        }
    }

    //This function checks the answer and displays appropriate message based on user input.
    function answerCheck() {
        $('#question').empty();
        $('#answer-list').empty();
    
        let correctAnswerText = questions[currentQuestion].answers[questions[currentQuestion].answer];
        let correctAnswerData = questions[currentQuestion].answer;

        //checks to see correct, incorrect, or unanswered
        if (userGuess === correctAnswerData && answered !== false) {
            correctAnswer++;
            $('#game-alert').html('Excellent work!');
            $('#answer-image').html('<img src="./assets/images/check-mark.png" class="answer-image">');
        } else if (userGuess !== correctAnswerData && answered !== false) {
            incorrectAnswer++;
            $('#game-alert').html('Going to need to study harder next time on that one');
            $('#answer-image').html('<img src="./assets/images/x-mark.png" class="answer-image">');
            $('#correct-answer-text').html('The correct answer was: ' + correctAnswerText);
        } else {
            unanswered++;
            answered = true;
            $('#game-alert').html('Times up!');
            $('#answer-image').html('<img src="./assets/images/x-mark.png" class="answer-image">');
            $('#correct-answer-text').html('The correct answer was: ' + correctAnswerText);   
        }

        if (currentQuestion === (questions.length - 1)){
            setTimeout(gameOver, 3000)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 3000);
        }	
    }
    //End of game function to display totals and restart button
    function gameOver() {
        $('#quiz-question-page').hide();
        $('#quiz-answer-page').hide();
        $('#quiz-game-over-page').show();
        $('#quiz-game-over-page').html(`
        <div class="jumbotron shadow text-center quiz-game-over-page">
            <h1 class="display-4" id="game-over-title">Finished!</h1>
            <p class="lead">Here are your results.</p>
            <hr class="my-4">
            <h2>Correct Answers: ${correctAnswer}</h2>
            <h2>Incorrect Answers: ${incorrectAnswer}</h2>
            <h2>Unanswered: ${unanswered}</h2>
            <button class="btn btn-primary btn-lg mt-3" href="#" role="button" id="restart-button">Restart Quiz</button>
            <div class="mt-5" id="suggestions"></div>
        </div>
        `);
        

        $('#restart-button').on('click', function(){
            $('#quiz-game-over-page').hide();
            renderGame();
        });
    }
    // End Functions for Game //

    //On click listen for the start button
    $('#start-button').on('click', function(){
        $('#quiz-intro-page').hide();
        $('#quiz-question-page').show();
        renderGame();
    });

    //Restarts screens
    $('#quiz-intro-page').show();
    $('#quiz-question-page').hide();
    
    
});
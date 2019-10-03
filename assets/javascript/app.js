
$(document).ready(function() {
    $("#new").hide();
    var correctCount = 0;
    var wrongCount = 0;
    var timer = 10;
    var intervalId;
    var userChoice = "";
    var runTime = false;
    var pick;
    var index;
    var newArray = [];


    var gameQuestions = [{
            question: "1. Tetris was first created in what country:",
            choices: ["Great Britian", "USA", "Russia", "Japan"],
            answer: 2,
        },
        {
            question: "2. In Assassin's Creed 2 you played as:",
            choices: [
                "Bayek",
                "Ezio Auditore",
                "Connor Kenway",
                "Altaïr Ibn-LaʼAhad"
            ],
            answer: 1,
        },
        {
            question: "3. Which game was NOT made by Valve:",
            choices: [
                "Portal",
                "Team Fortress 2",
                "Half-Life 3",
                "Counter-Strike: Global Offensive"
            ],
            answer: 2,
        },
        {
            question: "4. Who are the enemies you fight in DOOM:",
            choices: ["Demons",
                "UAC",
                "Angels",
                "Aliens"
            ],
            answer: 0,
        },
        {
            question: "5. Which game series is Nintendo most profiable:",
            choices: ["Pokemon",
                "Super Mario Bros",
                "Legend of Zelda",
                "Super Smash Bros"
            ],
            answer: 0,
        }
    ];
    $(".lead").hide();
    $("#cancel").hide();
    $("#start").click(function() {
        $("#start").hide();
        $(".directions").hide();
        $(".lead").show();
        askGameQuestions();
        startTimer();
        $("#cancel").show();
    })
    $("#cancel").click(function() {
        location.reload();
    })

    function startTimer() {
        if (!runTime) {
            intervalId = setInterval(decrement, 1000);
            runTime = true;
        }
    }

    function decrement() {
        $("#timer").text("Time Left: " + timer);
        timer--;

        if (timer === 0) {
            wrongCount++;
            stopTime();
            $("#ans").text("Wrong! The answer is: " + pick.choices[pick.answer]);
            nextQuestion();
        }
    }

    function stopTime() {
        runTime = false;
        clearInterval(intervalId);
    }

    function askGameQuestions() {
        index = Math.floor(Math.random() * gameQuestions.length)
        pick = gameQuestions[index];
        $("#question-asked").text(pick.question);
        for (var i = 0; i < pick.choices.length; i++) {
            var userAnswers = $("<div>");
            userAnswers.addClass("answer");
            userAnswers.html(pick.choices[i]);
            userAnswers.attr("guess", i);
            $("#ans").append(userAnswers);
        }
        $(".answer").click(function() {
            userAnswers = parseInt($(this).attr("guess"));

            if (userAnswers === pick.answer) {
                stopTime();
                correctCount++;
                userAnswers = "";
                $("#ans").text("Correct");
                nextQuestion();
            } else {
                stopTime();
                wrongCount++;
                userAnswers = "";
                $("#ans").text("Wrong! The answer is: " + pick.choices[pick.answer]);
                nextQuestion();
            }
        })
    }

    function nextQuestion() {
        newArray.push(pick);
        gameQuestions.splice(index, 1);
        var newQues = setTimeout(function() {
            $("#ans").empty();
            timer = 10;

            if ((wrongCount + correctCount) === 5) {
                $("#cancel").hide();
                $("#question-asked").empty();
                $("#question-asked").text("Game Over!  Here's how you did: ");
                $("#ans").append("Correct: " + correctCount + " ");
                $("#ans").append("Incorrect: " + wrongCount + " ");
                $("#new").show();
                correctCount = 0;
                wrongCount = 0;

            } else {
                startTimer();
                askGameQuestions();
            }
        }, 1000);

    }
    //new game function 
    $("#new").click(function() {
        $("#new").hide();
        $("#ans").empty();
        $("#question-asked").empty();
        for (var i = 0; i < newArray.length; i++) {
            gameQuestions.push(newArray[i]);
        }
        startTimer();
        askGameQuestions();
    })

});
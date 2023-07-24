//create document elements
var body = document.body;
var main = body.children[1].children[0];
var timer = document.createElement("div");
var h2El = document.createElement("h2");
var pEl = document.createElement("p");
var listEl = document.createElement("ul");
var liEl = document.createElement("li");
var answerText = document.createElement("div");

//FORM elements
var form = document.createElement("form");
var label = document.createElement("label");
var input = document.createElement("input");
var submit = document.createElement("input");
form.setAttribute("id", "capture-scores");
form.setAttribute("name", "capture-scores");
label.setAttribute("for", "initials");
input.setAttribute("type", "text");
input.setAttribute("id", "initials");
input.setAttribute("name", "initials");
submit.setAttribute("type", "submit");
submit.setAttribute("value", "Submit");

//Static elements within HTML
body.children[0].appendChild(timer);
timer.textContent = "Time: ";
main.appendChild(h2El);
main.appendChild(pEl);
main.appendChild(liEl);
main.appendChild(listEl);
// sets classes for the start and answer buttons for use in event listeners
liEl.setAttribute ("class", "start");
listEl.setAttribute ("class", "answers");
var startbttn = document.querySelector(".start");
var answerbttn = document.querySelector(".answers");

// Global variables for score, questions index, scorboard, and timer
var score = 0;
var questionIndex =  0;
var timeLeft = 45;
var initial = '';
var timeInterval = '';
var finalScore= [];


//Landing Page Setup BEGIN
var welcomeScreen = {
    header: "Coding Quiz Challenge",
    info: "Try to answer the following code-related questions within the time limit. You will have 45 seconds to complete the quiz. Keep in mind that incorrect answers will penalize your score/time by ten seconds!",
    button: "Start Quiz"
}

// content for when the Quiz Loads
function startScreen(){
    h2El.textContent = welcomeScreen.header;
    pEl.textContent = welcomeScreen.info;
    liEl.textContent = welcomeScreen.button;
    var storedFinalScore = JSON.parse(localStorage.getItem("finalScore"));
    if (storedFinalScore !== null){
        finalScore = storedFinalScore;
    }
}


// Question & Answers object array
var questions = [
    
    {  
        question: "String values must be enclosed within ___ when being assigned to variables.",
        options: ["1.Commas","2.Curly Brackets","3.Quotes","4.Parentheses"],
        correct: "3.Quotes"
    },
    {  
        question: "Is Javascript a case-sensitive language",
        options: ["1.Yes","2.No"],
        correct: "1.Yes"
    },
    {  
        question: "Javascript is an ____ language?",
        options: ["1.Object-Oriented","2.Object-Based","3.Procedural","4.None of the above"],
        correct: "1.Object-Oriented"
    },
    {  
        question: "Which of the following keywords is used to define a variable in Javascript?",
        options: ["1.var","2.let","3.Both 1 and 2","4.None of the above"],
        correct: "3.Both 1 and 2"
    },
    {  
        question: "Which of the following methods is used to access HTML elements using Javascript",
        options: ["1.getElementbyId()","2.getElementsByClassName()","3.Both 1 and 2", "4.None of the above"],
        correct: "3.Both 1 and 2"
    },
    {  
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        options: ["1.Throws an error","2.Ignores the statements", "3.Gives a warning", "4.None of the above"],
        correct: "2.Ignores the statements"
    },
]
// Timer 
function setTime(){
    timeInterval = setInterval(function(){
        timeLeft--;
        timer.textContent = "Time: "+timeLeft;
        setScore();
    },1000);
};

// Setting Score
function setScore(){
    if (timeLeft>0 && questionIndex===questions.length){
        score = timeLeft;
        clearInterval(timeInterval);
    } else if (timeLeft<=0){
        score = 0;
        clearInterval(timeInterval);
        removeOptions();
        loadFinished();
    }else{
        score = timeLeft;
    }
    console.log(score);
}


//Creates li elements for each potential answer
function loadOptions(){
    var index = 0;
    questions[questionIndex].options.forEach(element => {
        element = document.createElement("li");
        listEl.appendChild(element);
        element.textContent = questions[questionIndex].options[index];
        index++;
    });
}

// clears the slate when correct answer is selected
function removeOptions(){
    var list = main.querySelectorAll("li");
    var list2 = main.querySelectorAll("div");
        list.forEach(lis =>{
            lis.remove();
        });
        list2.forEach(lis =>{
            lis.remove();
        });
}

// loads the next question and answers
function loadQuestion(){
 
    if (questionIndex<questions.length){
        h2El.textContent = questions[questionIndex].question;
        loadOptions();
    }else{
        loadFinished ();
    }
}   

// loads the final page after quiz is completed
function loadFinished (){
    h2El.textContent = "All Done!";
    main.appendChild(pEl);
    pEl.textContent = "Your final score is "+ score +"."
    main.appendChild(form);
    formNode = main.children[3]
    formNode.appendChild(label);
    formNode.appendChild(input);
    formNode.appendChild(submit);
    label.textContent = "Enter initials";
};

// stores initials & score to local memory
function recordFinalScore(){
    localStorage.setItem("finalScore", JSON.stringify(finalScore));
};

// EventListener for "Start Quiz" button
startbttn.addEventListener("click", function(){
            main.removeChild(pEl);
            main.removeChild(liEl);
            setTime();
            loadQuestion();
});

// EventListener for Answer options
answerbttn.addEventListener("click", function(event){
    var answer = event.target;
    main.appendChild(answerText);
        if (answer.textContent===questions[questionIndex].correct){
            questionIndex++;
            answerText.textContent = "Correct!";     
            setTimeout(removeOptions,300);
            setTimeout(loadQuestion,300);
        }else {
            answerText.textContent = "Incorrect!";
            questionIndex++;
            timeLeft=timeLeft-10;
            setTimeout(removeOptions,300);
            setTimeout(loadQuestion,300);
        }
});

// Eventlistener for Submit button on form
addEventListener("submit", function(event){
    event.preventDefault();
    initial = document.querySelector("#initials").value ;
    if (initial=== ""){
        this.alert('Initials cannot be blank to be added to highscores');
        return;
    } else{
        finalScore.push({initial, score});
        recordFinalScore();
        this.window.location.href = "assets/html/highscores.html";
    }
})

//Starts the process over when the screen is reloaded
addEventListener("load", startScreen);










// global variables
var goBack = document.getElementById("back");
var clearHighscore = document.getElementById("clear-highscores");

// takes the scores out of memory and creates an ordered list for each score. Goes from highest score to lowest score
function renderFinalScore(){
    var storedScores = JSON.parse(localStorage.getItem("finalScore"));
    //Sorting functionality occurs here
    var storedScores = storedScores.sort( 
      (s1,s2) => (s1.score < s2.score) ? 1 : (s1.score>s2.score) ? -1 : 0
    );

        for (var i = 0; i < storedScores.length; i++) {
            var highScores = storedScores[i];
            var ulEL = document.querySelector('ol');
            var li = document.createElement("li");
            li.setAttribute("id", "highscore")
            ulEL.appendChild(li);
            li.textContent = highScores.initial.toUpperCase() + " " + highScores.score;
        }
};

// When page loads it runs renderFinalScore which prints all the scores 
addEventListener("load", renderFinalScore );

// Back button takes you Quiz
goBack.addEventListener("click", function(event){
  window.location.href = "../../index.html";
});

// Clears history
clearHighscore.addEventListener("click",function(event){
  localStorage.clear();
  var list = document.querySelectorAll("li");
  list.forEach(lis =>{
    lis.remove();
  });
});
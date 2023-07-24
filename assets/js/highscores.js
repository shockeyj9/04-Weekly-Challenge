var goBack = document.getElementById("back");
var clearHighscore = document.getElementById("clear-highscores");

function renderFinalScore(){
    var storedScores = JSON.parse(localStorage.getItem("finalScore"));
    var sortedScores = storedScores.sort(
      (p1,p2) => (p1.score < p2.score) ? 1 : (p1.score>p2.score) ? -1 : 0
    );

        for (var i = 0; i < storedScores.length; i++) {
            var highScores = storedScores[i];
            var ulEL = document.querySelector('ul');
            var li = document.createElement("li");
            li.setAttribute("id", "highscore")
            ulEL.appendChild(li);
            li.textContent = highScores.initial.toUpperCase() + " " + highScores.score;
          }
        }

addEventListener("load", renderFinalScore );
goBack.addEventListener("click", function(event){
  history.back();
});
clearHighscore.addEventListener("click",function(event){
  localStorage.clear();
  var list = document.querySelectorAll("li");
  list.forEach(lis =>{
    lis.remove();
});
});
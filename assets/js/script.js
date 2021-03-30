var startButton = document.querySelector("#start");
var timerBox = document.getElementById("timer");
var question = document.getElementById("question");
var main = document.getElementById("main");
var scoreList = document.querySelector(".Scorelist");
var score = 0;
var nextQuestionId = 0;
var time;
var storedScore = JSON.parse(localStorage.getItem("score"));
if(!storedScore){
  var storedScore = [];
}
var storedNames = JSON.parse(localStorage.getItem("names"));
if(!storedNames){
  var storedNames = [];
}

// Show next question and options 
function nextQuestion(nextQuestionId) {

  question.innerHTML = questions[nextQuestionId].question;
  main.innerHTML = "";
  var choice1 = document.createElement("a");
  choice1.textContent = questions[nextQuestionId].a;
  choice1.setAttribute("data-id", "1");
  if (questions[nextQuestionId].win == "a") {
    choice1.setAttribute("data-win", "true");
  }
  main.appendChild(choice1);

  var choice2 = document.createElement("a");
  choice2.textContent = questions[nextQuestionId].b;
  choice2.setAttribute("data-id", "2");
  if (questions[nextQuestionId].win == "b") {
    choice2.setAttribute("data-win", "true");
  }
  main.appendChild(choice2);

  var choice3 = document.createElement("a");
  choice3.textContent = questions[nextQuestionId].c;
  choice3.setAttribute("data-id", "3");
  if (questions[nextQuestionId].win == "c") {
    choice3.setAttribute("data-win", "true");

  }
  main.appendChild(choice3);

  var choice4 = document.createElement("a");
  choice4.textContent = questions[nextQuestionId].d;
  choice4.setAttribute("data-id", "4");
  if (questions[nextQuestionId].win == "d") {
    choice4.setAttribute("data-win", "true");
  }
  main.appendChild(choice4);
  window.nextQuestionId++;
}

// Timer
timerBox.addEventListener("click", function (event) {

  if(event.target.id = "startagain"){
    highScore();
    score = 0;
    nextQuestionId = 0;
  }

  time = 31;
  var timer = setInterval(function () {
    timerBox.innerHTML = "";
    time--;
    timerBox.textContent = time + " seconds left.";

    if (time < 1) {
      clearInterval(timer);
      timerBox.innerHTML = "<button id='startagain'>Play again</button>";
      question.innerHTML = "Game Over";
      enterscore();
    }
  }, 1000);

  nextQuestion(nextQuestionId);
  
});

// High score
function highScore(){
  for (var i = 0; i < storedScore.length; i++) {
    var highScore = storedScore[i];
    var highScoreName = storedNames[i];
    var li = document.createElement("li");
    li.textContent = highScoreName + " - " + highScore + "pts";
    scoreList.appendChild(li);
  }

}

// Endgame
function enterscore(){
  time = 0;
  main.innerHTML = "";
  scoreList.innerHTML = "Your Score is : " + score + "<form>Enter your name : <input type='text' id='name' name='name' > <button> Send </button></form>";
}

// Check the result selected
main.addEventListener("click", function (event) {
  win = event.target.getAttribute("data-win");
  if (win) {
    score += 10;
  } else {
    time -= 5;
  }
  if(nextQuestionId < 10){
    nextQuestion(nextQuestionId);
  }else{
    enterscore();
  }

});

//Enter name in the high score
scoreList.addEventListener("submit", function(event) {
  event.preventDefault();
  var name = document.getElementById("name");
  console.log(name.value);
  addName = storedNames.push(name.value);
  localStorage.setItem("names", JSON.stringify(storedNames));

  stores = storedScore.push(score);
  localStorage.setItem("score", JSON.stringify(storedScore));
  scoreList.innerHTML = "";
  highScore();

});


highScore();
// Declare all the variables
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

// Show next question and clickable options 
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

// Timer. Starts at 30secs, remove 5 sec each time a wrong answer is clicked. Shows game over when the timer reaches 0.
timerBox.addEventListener("click", function (event) {

  if(event.target.id = "startagain"){
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

// Sorts the highscore and shows it in li tags
function highScore(){
  storedScore.sort();
  storedScore.reverse();
  for (var i = 0; i < storedScore.length; i++) {
    var highScore = storedScore[i];
    var li = document.createElement("li");
    li.textContent = highScore;
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
  stores = storedScore.push(score + "pts -- " + name.value);
  localStorage.setItem("score", JSON.stringify(storedScore));
  scoreList.innerHTML = "";
  highScore();

});


highScore();
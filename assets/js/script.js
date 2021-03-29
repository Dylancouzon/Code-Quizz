var startButton = document.querySelector("#start");
var timerBox = document.getElementById("timer");
var question = document.getElementById("question");
var main = document.getElementById("main");
var score = 0;
var nextQuestionId = 0;
var time;
var storedScore = JSON.parse(localStorage.getItem("score"));
if(!storedScore){var storedScore = [];}

// Show next question and options 
function nextQuestion(nextQuestionId) {

  question.innerHTML = questions[nextQuestionId].question;
  main.innerHTML = "";
  var choice1 = document.createElement("a");
  choice1.innerHTML = questions[nextQuestionId].a;
  choice1.setAttribute("data-id", "1");
  if (questions[nextQuestionId].win == "a") {
    choice1.setAttribute("data-win", "true");
  }
  main.appendChild(choice1);

  var choice2 = document.createElement("a");
  choice2.innerHTML = questions[nextQuestionId].b;
  choice2.setAttribute("data-id", "2");
  if (questions[nextQuestionId].win == "b") {
    choice2.setAttribute("data-win", "true");
  }
  main.appendChild(choice2);

  var choice3 = document.createElement("a");
  choice3.innerHTML = questions[nextQuestionId].c;
  choice3.setAttribute("data-id", "3");
  if (questions[nextQuestionId].win == "c") {
    choice3.setAttribute("data-win", "true");

  }
  main.appendChild(choice3);

  var choice4 = document.createElement("a");
  choice4.innerHTML = questions[nextQuestionId].d;
  choice4.setAttribute("data-id", "4");
  if (questions[nextQuestionId].win == "d") {
    choice4.setAttribute("data-win", "true");
  }
  main.appendChild(choice4);
  window.nextQuestionId++;
}

// Timer
timerBox.addEventListener("click", function (event) {

  time = 31;
  var timer = setInterval(function () {
    timerBox.innerHTML = "";
    time--;
    timerBox.textContent = time + " seconds left.";

    if (time < 1) {
      clearInterval(timer);
      timerBox.innerHTML = "<button id='start'>Play again</button>";
      question.innerHTML = "Game Over";
      enterscore();
    }
  }, 1000);

  nextQuestion(nextQuestionId);
  
});

// High score
function highScore(){
  

}

// Endgame
function enterscore(){
  main.innerHTML = "Your Score is : " + score + "<br> Enter your name :";
  console.log(storedScore);
  store = storedScore.push(score);
  localStorage.setItem("score", JSON.stringify(store));
  score = 0;
  nextQuestionId = 0;
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

highScore();
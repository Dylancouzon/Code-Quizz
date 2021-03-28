var startButton = document.querySelector("#start");
var timerBox = document.getElementById("timer");
var question = document.getElementById("question");
var main = document.getElementById("main");
var score = 0;
var nextquestion = 0;
// Start game
function startGame(){


  question.innerHTML = questions[nextquestion].question;

  var choice1 = document.createElement("a");
  choice1.innerHTML = questions[nextquestion].a;
  main.appendChild(choice1);
  var choice2 = document.createElement("a");
  choice2.innerHTML = questions[nextquestion].b;
  main.appendChild(choice2);
  var choice3 = document.createElement("a");
  choice3.innerHTML = questions[nextquestion].c;
  main.appendChild(choice3);
  var choice4 = document.createElement("a");
  choice4.innerHTML = questions[nextquestion].d;
  main.appendChild(choice4);
}


timerBox.addEventListener("click", function(event) {
  // Timer
  var time = 31;
  var timer = setInterval(function(){

    timerBox.innerHTML = "";
    time--;
    timerBox.textContent = time + " seconds left.";

    if(time < 1){
      clearInterval(timer);
      timerBox.innerHTML = "Game Over <button id='start'>Play again</button>";
    }
  }, 1000);

  startGame(time);
  
});

var startButton = document.querySelector("#start");
var timerBox = document.getElementById("timer");
var question = document.getElementById("question");
var main = document.getElementById("main");
var score = 0;

// Show next question and options 
function nextQuestion(nextquestion) {

  question.innerHTML = questions[nextquestion].question;
  console.log(questions[nextquestion].win);

  var choice1 = document.createElement("a");
  choice1.innerHTML = questions[nextquestion].a;
  choice1.setAttribute("data-id", "1");
  if (questions[nextquestion].win == "a") {
    choice1.setAttribute("data-win", "true");
  }
  main.appendChild(choice1);

  var choice2 = document.createElement("a");
  choice2.innerHTML = questions[nextquestion].b;
  choice2.setAttribute("data-id", "2");
  if (questions[nextquestion].win == "b") {
    choice2.setAttribute("data-win", "true");
  }
  main.appendChild(choice2);

  var choice3 = document.createElement("a");
  choice3.innerHTML = questions[nextquestion].c;
  choice3.setAttribute("data-id", "3");
  if (questions[nextquestion].win == "c") {
    choice3.setAttribute("data-win", "true");
    
  }
  main.appendChild(choice3);

  var choice4 = document.createElement("a");
  choice4.innerHTML = questions[nextquestion].d;
  choice4.setAttribute("data-id", "4");
  if (questions[nextquestion].win == "d") {
    choice1.setAttribute("data-win", "true");
  }
  main.appendChild(choice4);
}

// Timer
timerBox.addEventListener("click", function (event) {

  var time = 31;
  var timer = setInterval(function () {
    timerBox.innerHTML = "";
    time--;
    timerBox.textContent = time + " seconds left.";

    if (time < 1) {
      clearInterval(timer);
      timerBox.innerHTML = "<button id='start'>Play again</button>";
      question.innerHTML = "Game Over";
      main.innerHTML = "Enter your name : ";
    }
  }, 1000);

  nextQuestion("0");

});

// Check the result selected
main.addEventListener("click", function (event) {
  win = event.target.getAttribute("data-win");
  if(win){
    score += 10;
  }else{
    time -= 5;
  }
  console.log(score);
});

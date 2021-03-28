var startButton = document.querySelector("#start");
var timerBox = document.getElementById("timer");
var time = 31;



startButton.addEventListener("click", function(event) {
  // Timer
  var timer = setInterval(function(answer){
    timerBox.innerHTML = "";
    time--;
    timerBox.textContent = time + " seconds left.";

    if(time === 0){
      clearInterval(timer);
      timerBox.innerHTML = "Game Over <button id='enterScore'>Enter Score</button>";
    }
  }, 1000);
  
});

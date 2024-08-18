const countDownDate = new Date(Date.UTC(2023, 9, 25, 22, 0, 0)).getTime();
function countDown() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").style.display = "none";
    document.getElementById("countdown-header").style.display = "none";
  }
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}
countDown();
var x = setInterval(countDown, 1000);

function consoleText(word, id) {
  var console = document.getElementById("console");
  console.style.opacity = "1";
  window.setInterval(function() {
    console.style.opacity = console.style.opacity === "1" ? "0" : "1";
  }, 800);

  var letterCount = 1;
  var waiting = false;
  var target = document.getElementById(id);
  window.setInterval(function() {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = word.substring(0, letterCount);
      window.setTimeout(function() {
        letterCount += 1;
        waiting = false;
      }, 1000);
    } else if (letterCount === word.length + 1 && waiting === false) {
      waiting = true;
    } else if (waiting === false) {
      target.innerHTML = word.substring(0, letterCount);
      letterCount += 1;
    }
  }, 240)
}

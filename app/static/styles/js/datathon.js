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

consoleText("Datathon 2023", "terminal");

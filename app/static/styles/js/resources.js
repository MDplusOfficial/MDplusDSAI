var allModules = document.getElementsByClassName("module");

for (var i = 0; i < allModules.length; i++) {
  if (allModules[i].id !== "introduction") {
    allModules[i].style.display = "none";
  }
}

function toggleModule(a) {
  var next = a.dataset.link;
  if (next == null) return false;
  var nextModule = document.getElementById(next);
  if (nextModule == null) return false;
  if (nextModule.style.display === "block") return true;
  for (var i = 0; i < allModules.length; i++) {
    allModules[i].style.display = "none";
  }
  nextModule.style.display = "block";
}

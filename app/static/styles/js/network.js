let allPeople = document.getElementsByClassName("person");

function tagClick(a) {
  if (a.className.includes("active")) { return false; }
  for (var i = 0; i < allPeople.length; i++) {
    allPeople[i].style.display = "none";
  }
  for (var i = 0; i < allPeople.length; i++) {
    var person = allPeople[i];
    var attributes = person.dataset.attributes.split(",");
    for (var j = 0; j < attributes.length; j++) {
      if (a.id.startsWith(attributes[j])) {
        person.style.display = window.innerWidth < 768 ? "block" : "grid";
        break;
      }
    }
  }
  var searchButtons = document.getElementsByTagName("button");
  for (var i = 0; i < searchButtons.length; i++) {
    searchButtons[i].className = "";
  }
  a.className += "active";
}

function tagReset() {
  for (var i = 0; i < allPeople.length; i++) {
    allPeople[i].style.display = window.innerWidth < 768 ? "block" : "grid";
  }
  var searchButtons = document.getElementsByTagName("button");
  for (var i = 0; i < searchButtons.length; i++) {
    searchButtons[i].className = "";
  }
  document.getElementById("all").className = "active";
}

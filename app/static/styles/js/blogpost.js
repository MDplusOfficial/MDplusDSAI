var article = document.getElementsByTagName("article")[0];
var text = article.getElementsByTagName("p");
var wordCount = 0;

for (var i = 0; i < text.length; i++) {
  if (text[i].className.includes("preview")) {
    continue; 
  } else if (text[i].className.includes("author")) {
    continue;
  }
  wordCount += text[i].innerHTML.split(" ").length;
}
document.getElementById("read-time").innerHTML = Math.round(wordCount / 250).toString() + " min read";

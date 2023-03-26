let allPosts = document.getElementsByClassName("block");

var today = new Date();
for (var i = 0; i < allPosts.length; i++) {
    var post = allPosts[i];
    var postDate = new Date(post.dataset.date);
    var recency = post.getElementsByClassName("date");
    if (recency.length === 0) { continue; }
    recency = recency[0];
    var delta = (today - postDate) / (1000 * 60 * 60 * 24);
    if (delta < 1) {
        recency.innerHTML = "Less than a day ago";
    } else if (delta < 2) {
        recency.innerHTML = "1 day ago";
    } else if (delta < 7) {
        recency.innerHTML = Math.floor(delta).toString() + " days ago";
    } else if (delta < 14) {
        recency.innerHTML = "1 wk ago";
    } else if (delta < 30) {
        recency.innerHTML = Math.floor(delta / 7).toString() + " wks ago";
    } else if (delta < 61) {
        recency.innerHTML = "1 mo ago";
    } else if (delta < 365) {
        recency.innerHTML = Math.floor(delta / 30.5).toString() + " mo ago";
    } else if (delta < 730) {
        recency.innerHTML = "1 yr ago";
    } else {
        recency.innerHTML = Math.floor(delta / 365).toString() + " yrs ago";
    }
}

let aTags = document.getElementsByClassName("tags");
for (var i = 0; i < aTags.length; i++) {
    var tags = aTags[i].getElementsByTagName("a");
    for (var j = 0; j < tags.length; j++) {
        if (tags[j].className.length !== 0) {
            tags[j].innerHTML = tags[j].className.charAt(0).toUpperCase() + tags[j].className.split(" ")[0].slice(1);
        }
    }
}

function tagClick(a) {
  if (a.className.includes("active")) { return false; }
  for (var i = 0; i < allPosts.length; i++) {
    allPosts[i].style.display = "none";
  }
  for (var i = 0; i < allPosts.length; i++) {
    var post = allPosts[i];
    var tags = post.getElementsByClassName("tag");
    for (var j = 0; j < tags.length; j++) {
      if (a.className.startsWith(tags[j].className)) {
        post.style.display = "block";
        break;
      }
    }
  }
  var searchTags = document.getElementsByClassName("search");
  for (var i = 0; i < searchTags.length; i++) {
    searchTags[i].classList.remove("active");
  }
  a.className += " active";
}

function tagReset() {
  for (var i = 0; i < allPosts.length; i++) {
    allPosts[i].style.display = "block";
  }
  var searchTags = document.getElementsByClassName("search");
  for (var i = 0; i < searchTags.length; i++) {
    searchTags[i].classList.remove("active");
  }
}

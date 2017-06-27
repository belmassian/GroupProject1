var config = {
  apiKey: "AIzaSyAmzWqyKDVOt80b43DplFYGdD1ChLga6xk",
  authDomain: "groupproject1-86e02.firebaseapp.com",
  databaseURL: "https://groupproject1-86e02.firebaseio.com",
  projectId: "groupproject1-86e02",
  storageBucket: "",
  messagingSenderId: "555005447916"
  };
firebase.initializeApp(config);
var database = firebase.database();
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}


// Capture Button Click
$("#add-user").on("click", function(event) {
  // prevent page from refreshing when form tries to submit itself
  event.preventDefault();

  // Capture user inputs and store them into variables
  var name = $("#name-input").val().trim();
  var email = $("#email-input").val().trim();
  var apartmentnumb = $("#apartmentnumb-input").val().trim();

  // Console log each of the user inputs to confirm we are receiving them
  console.log(name);
  console.log(email);
  console.log(apartmentnumb);

  // Replaces the content in the "recent-member" div
  $("#name-display").html();
  $("#email-display").html();
  $("#apartmentnumb-display").html();

  // Output all of the new information into the relevant sections
  $("#name-display").html(name);
  $("#email-display").html(email);
  $("#apartmentnumb-display").html(apartmentnumb);

  // Clear localStorage
  localStorage.clear();

  // Store all content into localStorage
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("apartmentnumb", apartmentnumb);
});

// By default display the content from localStorage
$("#name-display").html(localStorage.getItem("name"));
$("#email-display").html(localStorage.getItem("email"));
$("#apartmentnumb-display").html(localStorage.getItem("apartmentnumb"));


var list = JSON.parse(localStorage.getItem("todolist"));

// Checks to see if the todolist exists in localStorage and is an array currently
// If not, set a local list variable to an empty array
// Otherwise list is our current list of todos
if (!Array.isArray(list)) {
  list = [];
}

function putOnPage() {

  $("#todo-list").empty(); // empties out the html

  var insideList = JSON.parse(localStorage.getItem("todolist"));

  // Checks to see if we have any todos in localStorage
  // If we do, set the local insideList variable to our todos
  // Otherwise set the local insideList variable to an empty array
  if (!Array.isArray(insideList)) {
    insideList = [];
  }

  // render our insideList todos to the page
  for (var i = 0; i < insideList.length; i++) {
    var p = $("<p>").text(insideList[i]);
    var b = $("<button class='delete'>").text("x").attr("data-index", i);
    p.prepend(b);
    $("#todo-list").prepend(p);
  }
}

// render our todos on page load
putOnPage();

$(document).on("click", "button.delete", function() {
  var todolist = JSON.parse(localStorage.getItem("todolist"));
  var currentIndex = $(this).attr("data-index");

  // Deletes the item marked for deletion
  todolist.splice(currentIndex, 1);
  list = todolist;

  localStorage.setItem("todolist", JSON.stringify(todolist));

  putOnPage();
});

$("input[type='submit']").on("click", function(event) {
  event.preventDefault();
  // Setting the input value to a variable and then clearing the input
  var val = $("input[type='text']").val();
  $("input[type='text']").val("");

  // Adding our new todo to our local list variable and adding it to local storage
  list.push(val);
  localStorage.setItem("todolist", JSON.stringify(list));

  putOnPage();
});

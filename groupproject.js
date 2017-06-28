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


var name = "";
var email = "";
var Apartment = "";

// Click Button changes what is stored in firebase
$("#click-button").on("click", function() {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get inputs
  name = $("#name-input").val().trim();
  email = $("#email-input").val().trim();
  Apartment = $("#Apartment-input").val().trim();

  // Change what is saved in firebase
  database.ref().set({
    name: name,
    email: email,
    Apartment: Apartment
  });
});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());

  // Log the value of the various properties
  console.log(snapshot.val().name);
  console.log(snapshot.val().email);
  console.log(snapshot.val().Apartment);

  // Change the HTML
  $("#displayed-data").html(snapshot.val().name + " | " + snapshot.val().email + " | " + snapshot.val().Apartment);
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


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

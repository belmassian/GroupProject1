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




// Click Button changes what is stored in firebase
$("#click-button").on("click", function() {
  // Prevent the page from refreshing
  event.preventDefault();
  var name = "";
  var email = "";
  var phone= "";
  var Apartment = "";
  // Get inputs
  var newRoommate{
    name: name,
    email: email,
    phone: phone,
    Apartment: apartment,
  }
  database.ref().push(newRoommate);
  console.log(newRoommate.name);
  console.log(newRoommate.email);
  console.log(newRoommate.phone);
  console.log(newRoommate.Apartment);
  alert("Employee successfully added");
  $("#name-input").val("");
  $("#email-input").val("");
  $("#phone-input").val("");
  $("#apartment-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
  var name = childSnapshot.val().name;
  var email = childSnapshot.val().role;
  var phone = childSnapshot.val().start;
  var apartment = childSnapshot.val().rate;

  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(apartment);


  // Add each train's data into the table
  $("#roommates-table > tbody").append("<tr><td>" + name + "</td><td>" + email + "</td><td>" +
  phone + "</td><td>" + apartment);
});
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

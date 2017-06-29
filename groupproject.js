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

function callAPI() {
  var queryURL = "https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=34c203eacb6b44899e6533749db691e7";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).done(function(response1) {
    console.log(response1)
  });
};

callAPI();


// Click Button changes what is stored in firebase
$("#click-button").on("click", function() {
  // Prevent the page from refreshing
  event.preventDefault();
  var name = "";
  var amount = "";
  var date= "";
  var accountNumb = "";
  // Get inputs
  var newBill = {
    name: name,
    amount: amount,
    date: date,
    accountNumb: accountNumb,
  }
  database.ref().push(newBill);
  console.log(newRoommate.name);
  console.log(newRoommate.amount);
  console.log(newRoommate.date);
  console.log(newRoommate.accountNumb);
  alert("Bill successfully added");
  $("#name-input").val("");
  $("#amount-input").val("");
  $("#date-input").val("");
  $("#accountNumb-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
  var name = childSnapshot.val().name;
  var amount = childSnapshot.val().amount;
  var date = childSnapshot.val().date;
  var accountNumb = childSnapshot.val().accountNumb;

  console.log(name);
  console.log(amount);
  console.log(date);
  console.log(accountNumb);


  // Add each train's data into the table
  $("#bills-table > tbody").append("<tr><td>" + name + "</td><td>" + amount + "</td><td>" +
  date + "</td><td>" + accountNumb);
});

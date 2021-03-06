var config = {
   apiKey: "AIzaSyAmzWqyKDVOt80b43DplFYGdD1ChLga6xk",
   authDomain: "groupproject1-86e02.firebaseapp.com",
   databaseURL: "https://groupproject1-86e02.firebaseio.com",
   projectId: "groupproject1-86e02",
   storageBucket: "groupproject1-86e02.appspot.com",
   messagingSenderId: "555005447916"
 };

firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().getRedirectResult().then(function(result) {
if (result.credential) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // ...
}
// The signed-in user info.
var user = result.user;
}).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// The email of the user's account used.
var email = error.email;
// The firebase.auth.AuthCredential type that was used.
var credential = error.credential;
// ...
});

firebase.auth().signInWithRedirect(provider);
//
// firebase.auth().signOut().then(function() {
// // Sign-out successful.
// }).catch(function(error) {
// // An error happened.
// });
var database = firebase.database();


function callBuzzFeedAPI() {
  var queryURL = "https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=34c203eacb6b44899e6533749db691e7&limit=5";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).done(function(response1) {


    for (var i = 0; i < 5; i++) {

      var articleTitles = response1.articles[i].title;
      var articleURL = response1.articles[i].url;
      var articleImageURLs = response1.articles[i].urlToImage;
      var articleP = $("<a>");
      var imageDiv = $("<div>");
      var image = $("<img>");


      articleP.attr("href", articleURL);
      articleP.attr("target", "_blank");
      articleP.append(articleTitles);

      image.attr("src", articleImageURLs);
      image.attr("style", "width:300px");
      image.attr("style", "height:200px");


      imageDiv.append(articleP);
      imageDiv.append(image);
      imageDiv.addClass('item');
      $('#myCarousel .carousel-inner').append(imageDiv);
    }

    $('#myCarousel .carousel-inner .item:first-child').addClass('active');

  });
};

callBuzzFeedAPI();

function callReddit() {
  var queryURL = "https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top&apiKey=f1ebf9a2fcd943059f77fd0e2b638fff";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {


    var i = 0;

    for (var i = 0; i < 5; i++) {
      var articleHeaders = response.articles[i].title;
      var articleURLs = response.articles[i].url;
      var articleImg = response.articles[i].urlToImage;
      var articleH = $("<a>");
      var imageDiv = $("<div>");
      var image = $("<img>");


      articleH.attr("href", articleURLs);
      articleH.attr("target", "_blank");
      articleH.append(articleHeaders);

      image.attr("src", articleImg);
      image.attr("style", "width:300px");
      image.attr("style", "height:200px");

      imageDiv.append(articleH);
      imageDiv.append(image);
      imageDiv.addClass('item');

      $('#secondCarousel .carousel-inner').append(imageDiv);

    }

    $('#secondCarousel .carousel-inner .item:first-child').addClass('active');
  });
}


callReddit();


// Click Button changes what is stored in firebase
$("form").on("submit", function(event) {
  // Prevent the page from refreshing
  event.preventDefault();

  var name = $("#name-input").val();
  var amount = $("#amount-input").val();
  var date = $("#date-input").val();
  var accountNumb = $("#accountNumb-input").val();

  var newBill = {
    name: name,
    amount: amount,
    date: date,
    accountNumb: accountNumb,
  }

  database.ref().push(newBill);
  alert("Bill successfully added");
  $("#name-input").val("");
  $("#amount-input").val("");
  $("#date-input").val("");
  $("#accountNumb-input").val("");
  $("tbody").html("");
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().amount);
    console.log(snapshot.val().date);
    console.log(snapshot.val().accountNumb);

        
    // Change the HTML to reflect
    $("#name-display").html(snapshot.val().name);
    $("#amount-display").html(snapshot.val().amount);
    $("#date-display").html(snapshot.val().date);
    $("#accountNumb-display").html(snapshot.val().accountNumb);

    var datePretty = moment.unix(date).format("MM/DD/YYYY");
    changeColor(snapshot);
    // Add each train's data into the table
    // $("tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().amount + "</td><td>" +
    //   snapshot.val().date + "</td><td>" + snapshot.val().accountNumb);
  });

});

database.ref().on("child_added", function(snapshot) {
  
  // Change the HTML to reflect
  $("#name-display").html(snapshot.val().name);
  $("#amount-display").html(snapshot.val().amount);
  $("#date-display").html(snapshot.val().date);
  $("#accountNumb-display").html(snapshot.val().accountNumb);
  changeColor(snapshot);

  // Add each train's data into the table
  // $("tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().amount + "</td><td>" +
  //   snapshot.val().date + "</td><td>" + snapshot.val().accountNumb);

});

$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
    $('#secondCarousel').carousel()

});

function changeColor(snapshot) {

  var billDue = moment(snapshot.val().date, "MM/DD/YYYY");
  var today = moment().format("MM/DD/YYYY");
  var dayDiff = moment(billDue).diff(moment(today), "days");

  console.log(billDue);
  console.log(dayDiff);

  var tableRow = $("<tr>");

  if (dayDiff >= 30) {

    $(tableRow).addClass("date-green");
    // $(".date-green").attr("style", "color:green");
  } else if (dayDiff >= 10) {
    $(tableRow).addClass("date-yellow");
    // $(".date-yellow").attr("style", "color:#FA8625");
  } else {
    $(tableRow).addClass("date-red");
    // $(".date-red").attr("style", "color:red");
  };

  $(tableRow).append("<td>" + snapshot.val().name + "</td><td>" + snapshot.val().amount + "</td><td class='date-display'>" +
    snapshot.val().date + "</td><td>" + snapshot.val().accountNumb + "</td>");
  $("tbody").append(tableRow);

};


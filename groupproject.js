var config = {
<<<<<<< HEAD
   apiKey: "AIzaSyAmzWqyKDVOt80b43DplFYGdD1ChLga6xk",
   authDomain: "groupproject1-86e02.firebaseapp.com",
   databaseURL: "https://groupproject1-86e02.firebaseio.com",
   projectId: "groupproject1-86e02",
   storageBucket: "groupproject1-86e02.appspot.com",
   messagingSenderId: "555005447916"
 };

=======
  apiKey: "AIzaSyAmzWqyKDVOt80b43DplFYGdD1ChLga6xk",
  authDomain: "groupproject1-86e02.firebaseapp.com",
  databaseURL: "https://groupproject1-86e02.firebaseio.com",
  projectId: "groupproject1-86e02",
  storageBucket: "",
  messagingSenderId: "555005447916"
};
>>>>>>> bc0bdbccc0e1ce05fa459f1646c422898aabe283
firebase.initializeApp(config);
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
  }
  var user = result.user;
});

// Start a sign in process for an unauthenticated user.
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithRedirect(provider);
var database = firebase.database();
var storage = firebase.storage();

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
      image.attr("width", "300px");
      image.attr("height", "300px");

      imageDiv.append(articleP);
      imageDiv.append(image);
      $('.articleImage').append(imageDiv);

    };

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
      var articleImg = response.articles[i].urlToImage;
      var image = $("<img>");


      $('#articleHeaders').append(articleHeaders + "<br>");
      $(image).attr("src", articleImg);
      $('#articleImg').append(image);

    }

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
    // Add each train's data into the table
    $("tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().amount + "</td><td>" +
      snapshot.val().date + "</td><td>" + snapshot.val().accountNumb);
  });
});

database.ref().on("child_added", function(snapshot) {

  // Change the HTML to reflect
  $("#name-display").html(snapshot.val().name);
  $("#amount-display").html(snapshot.val().amount);
  $("#date-display").html(snapshot.val().date);
  $("#accountNumb-display").html(snapshot.val().accountNumb);


  // Add each train's data into the table
  $("tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().amount + "</td><td>" +
    snapshot.val().date + "</td><td>" + snapshot.val().accountNumb);

});
$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
});

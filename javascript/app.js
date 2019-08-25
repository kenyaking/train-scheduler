// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCZMUBxeTw2GLOmVO1dbsX8DP12OxKH-xY",
  authDomain: "train-scheduler-9280e.firebaseapp.com",
  databaseURL: "https://train-scheduler-9280e.firebaseio.com",
  projectId: "train-scheduler-9280e",
  storageBucket: "",
  messagingSenderId: "1038050892736",
  appId: "1:1038050892736:web:e522553a201e500d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTraintime").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    start: firstTrain,
    frequency: frequency
  }

  database.ref().push(newTrain);
  $("form")[0].reset(); 
});

database.ref().on("child_added", function(child) {
  var firstTrain = moment(child.val().start, "hh:mm");
  var timeDifference = moment().diff(moment(firstTrain), "minutes");
  var remainder = timeDifference % child.val().frequency;
  var minutesAway = child.val().frequency - remainder;
  var nextTrain = moment().add(minutesAway, "minutes");
  nextTrain = moment(nextTrain).format("hh:mm");

  $("#trains").append("<tr><td>" + child.val().name + 
    "</td><td>" + child.val().destination +
    "</td><td>" + child.val().frequency +
    "</td><td>"	+ nextTrain +
    "</td><td>" + minutesAway +
    "</td></tr>")

  });
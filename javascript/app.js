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

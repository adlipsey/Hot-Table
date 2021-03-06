// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservationInfo = [];
var waitingList = [];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Get all characters
app.get("/all", function(req, res) {
  res.json(newReservation);
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/reservationInfo", function(req, res) {
  return res.json(reservationInfo)
});

app.get("/api/waitingList", function(req, res) {
  return res.json(waitingList)

});


////post function
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;


  if (reservationInfo.length <= 4) {
  	reservationInfo.push(newReservation);
  	res.send(true);
  } 
  else {
  	waitingList.push(newReservation);
  	res.send(false);
  }
  console.log("Waiting list: "+waitingList);
  console.log("Reservationlist: " +reservationInfo);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

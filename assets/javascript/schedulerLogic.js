//=======================  global vars
var newTrain;
var trainAdd;
var trainName = "";
var destination = "";
var frequency = 0;
var nextArrival;
var minutesAway = 0;
var timeTest;
var trainTime;
var now = moment().format();
var today = moment().format("YYYY-MM-DD");
var todayDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
var timeDiff;
var timeRemainder;


//======================= global functions 

// displays what time the next train arrives
function getNextArrivalTime(trainStartTime) {
    nextArrival = moment(trainStartTime).add((timeDiff + minutesAway), "minutes").format("HH:mm");
    // console.log("pls work " + nextArrival);
};

//grabs remaining minutes left until next train shows up
function getMinutesAway() {
    var timestamp = $("#train-Start").val().trim();
    timestamp = moment(timestamp, "HH:mm").format();
    timeDiff = moment(now).diff(moment(timestamp), "minutes");
    timeRemainder = timeDiff % frequency;
    minutesAway = frequency - timeRemainder;
    getNextArrivalTime(timestamp);
};


$(document).ready(function () {

    $(".train-Submit").on("click", function (e) {
        //prevents form from resetting 
        e.preventDefault();
        var trainStartTime = moment($("#train-Start").val().trim(), "h:mm A").format('HH:mm');
        var currentTime = moment(now).format('HH:mm');

        trainName = $("#train-Name").val().trim();
        destination = $("#train-Destination").val().trim();
        trainTime = trainStartTime;
        frequency = $("#train-Freq").val().trim();

        if (trainStartTime > currentTime) {
            nextArrival = trainStartTime;
            minutesAway = moment($("#train-Start").val().trim(), "h:mm A").fromNow('HH:mm');
        } else {
            getMinutesAway();
        }
        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);

        newTrain = {
            name: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway
        };
        //initialize DB
        var database = firebase.database();
        // add data to firebase
        database.ref().push(newTrain);

        console.log("train name: " + newTrain.name);
        console.log("train stop: " + newTrain.destination);
        console.log("train StartTime: " + newTrain.trainTime);
        console.log("train intervals: " + newTrain.frequency);
        console.log("next train to arrive: " + newTrain.nextArrival);
        console.log("train is this far away: " + newTrain.minutesAway);

        // add train to table
        trainAdd = $("<tr><th scope='row'>" + newTrain.name + "</th><td>" + newTrain.destination + "</td><td>" + newTrain.frequency + "</td><td>" + newTrain.nextArrival + "</td><td>" + newTrain.minutesAway + "</td></tr>");
        $("#train-Data-Here").append(trainAdd);
    })

});
// variables for storing and retrieving data
var newTrain;
var trainAdd;
var trainName = "";
var destination = "";
var frequency = 0;
var nextArrival;
var minutesAway = 0;
var timeTest;
var trainTime;


$(document).ready(function () {

    // onclick of submit button
    $(".train-Submit").on("click", function (e) {
        // prevent the default action of the button 
        e.preventDefault();

        //used to test if an inputted time is BEFORE the train starttime
        timeTest = moment($("#train-Start").val().trim(), "HH:mm").add($("#train-Freq").val().trim(), "minutes").fromNow();

        console.log("testing ----- " + moment($("#train-Start").val().trim(), "HH:mm").format('LT'));
        console.log("testing part 2 ---" + (moment($("#train-Start").val().trim(), "HH:mm").fromNow()).includes("ago"));
        console.log("testing part 3 ---" + (moment($("#train-Start").val().trim(), "HH:mm").fromNow()));

        trainName = $("#train-Name").val().trim();
        destination = $("#train-Destination").val().trim();
        trainTime = moment($("#train-Start").val().trim(), "HH:mm").format('LT');
        frequency = $("#train-Freq").val().trim();


        // fix this -----v

        if ( (moment($("#train-Start").val().trim(), "HH:mm").add($("#train-Freq").val().trim(), "minutes").format("LT")).includes("ago")) {
            nextArrival = moment($("#train-Start").val().trim(), "HH:mm").format("LT");
        } else {
            nextArrival = moment($("#train-Start").val().trim(), "HH:mm").add($("#train-Freq").val().trim(), "minutes").format("LT");
        }
        if ((moment($("#train-Start").val().trim(), "HH:mm").add($("#train-Freq").val().trim(), "minutes").format("LT")).includes("ago")) {
            minutesAway = moment($("#train-Start").val().trim(), "HH:mm").fromNow();
        } else {
            minutesAway = moment($("#train-Start").val().trim(), "HH:mm").add($("#train-Freq").val().trim(), "minutes").fromNow();
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

        var database = firebase.database();
        // add data to firebase
        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.trainTime);
        console.log(newTrain.frequency);
        console.log(newTrain.nextArrival);
        console.log(newTrain.minutesAway);

        // add train to table
        trainAdd = $("<tr><th scope='row'>" + newTrain.name + "</th><td>" + newTrain.destination + "</td><td>" + newTrain.frequency + "</td><td>" + newTrain.nextArrival + "</td><td>" + newTrain.minutesAway + "</td></tr>");
        $("#train-Data-Here").append(trainAdd);
    })

});
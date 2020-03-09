const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//Connection URL
const url = "mongodb://localhost:27017/";
//Airport Code Array
const airCodes = ["YYC", "YEG", "YQX", "YQM", "YHZ",
                "YHM", "YXU", "YUL", "YOW", "YQB", "YQR", 
                "YXE", "YYT", "YYZ", "YVR", "YYJ", "YWG"]
const codeLength = airCodes.length;
const termNum = 3;
const dataNum = 125;
const maxTime = 10;
const minTime = 2;
// Database Name
const dbName = 'flightInfo'
const client = new MongoClient(url);
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany(documents, function(err, result) {
      assert.equal(err, null);
      assert.equal(documents.length, result.result.n);
      assert.equal(documents.length, result.ops.length);
      console.log("Inserted documents into the collection");
      callback(result);
    });
  }
let template = {
        carrierFsCode: "AA",
        flightNumber: "100",
        departureAirportFsCode: "JFK",
        arrivalAirportFsCode: "LHR",
        stops: "0",
        departureTerminal: "8",
        arrivalTerminal: "3",
        departureTime: "2020-04-17T18:10:00.000",
        arrivalTime: "2020-04-18T06:20:00.000",
        flightcost: "200"
     }
// console.log(JSON.stringify(template));
let documents = [];
function randomNum(limit) {
    return Math.floor(Math.random() * limit);
}
function randomPlus(limit) {
    return (Math.floor(Math.random() * limit)+1);
}
function numberToDay(j) {
    return ('0' + j).slice(-2);
}

for (let i=0; i<dataNum; i++) {
    let ticket = Object.create(template);
    ticket.departureAirportFsCode = airCodes[randomNum(codeLength)];
    do {
        ticket.arrivalAirportFsCode = airCodes[randomNum(codeLength)];
    }while (ticket.arrivalAirportFsCode.localeCompare(ticket.departureAirportFsCode) === 0);
    ticket.departureTerminal = randomPlus(termNum).toString();
    ticket.arrivalTerminal = randomPlus(termNum).toString();

    let dateDep = randomPlus(29);
    let dateArr = 0;
    let timeDep = randomNum(24);
    let flightTime = randomNum(maxTime-minTime)+minTime;
    let timeArr = timeDep + flightTime;
    if (timeArr>=24) {
        dateArr = dateDep + 1;
        timeArr = timeArr -24;
    }
    else dateArr = dateDep;

    ticket.departureTime = "2020-04-" + numberToDay(dateDep.toString()) + "T" +numberToDay(timeDep.toString()) +":00:00.000";
    ticket.arrivalTime = "2020-04-" + numberToDay(dateArr.toString()) + "T" +numberToDay(timeArr.toString()) +":00:00.000";
    // console.log(ticket.departureTime);  
    // console.log(ticket.arrivalTime);
    ticket.flightcost = randomPlus(10)+"00";
    // console.log(JSON.stringify(ticket));
    documents.push(ticket);
}

//Use connect method to connect to the server
client.connect(function(err) {
    assert.equal(null,err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    insertDocuments(db, function() {
        client.close();
      });
});

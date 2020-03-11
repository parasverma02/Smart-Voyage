const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//Connection URL
const url = "mongodb://localhost:27017/";
//Airport Code Array
// const airportCodes = ["YYC", "YEG", "YQX", "YQM", "YHZ",
//                 "YHM", "YXU", "YUL", "YOW", "YQB", "YQR", 
//                 "YXE", "YYT", "YYZ", "YVR", "YYJ", "YWG"]
const airportCodes = ["YEG", "YUL","YVR", "YWG", "YYZ"] //Edmonton, Montreal, Vancouver, Winnipeg, Toronto
const airportNum = airportCodes.length;
const termLimit= 3;
const dayNum = 30;
const maxTime = 6;
const minTime = 2;
// Database Name
const dbName = "flightInfo"
const colName = "documents"
const client = new MongoClient(url);
const insertDocuments = function(db, callback) {
    // Get the documents collection
    db.listCollections({name: colName})
    .next(function(err, collinfo) {
        if (collinfo) {
            // The collection exists
            db.collection(colName).drop(function(err, delOK) {
                if (err) throw err;
                if (delOK) console.log("Collection deleted");
            });
        }
    });
    const collection = db.collection(colName);
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
        carrierFsCode: "ACA",
        flightNumber: 100,
        departureAirportFsCode: "JFK",
        arrivalAirportFsCode: "LHR",
        stops: 0,
        departureTerminal: 2,
        arrivalTerminal: 1,
        departureTime: "2020-04-17T18:10:00.000",
        arrivalTime: "2020-04-18T06:20:00.000",
        flightcost: 200
     }
// console.log(JSON.stringify(template));
let documents = [];
let flightNum = [];
let termNum = []
//Generate flight number array for all flights
function flightGen(flightNum) {
    for(let i=0; i<20;i++) {
        let randomNum = 0;
        do {
            randomNum = Math.floor(Math.random() * 200)+101;
        } 
        while(flightNum.includes(randomNum))
        flightNum.push(randomNum);
    }
}
//Generate terminal array for all flights
function terminalGen(termNum) {
    for(let i=0; i<flightNum.length*2; i++) {
        termNum.push(randomPlus(termLimit))
    }
}
flightGen(flightNum);
terminalGen(termNum);
console.log(flightNum);
console.log(termNum);
function randomNum(limit) {
    return Math.floor(Math.random() * limit);
}
function randomPlus(limit) {
    return (Math.floor(Math.random() * limit)+1);
}
function numberToDay(number) {
    return ('0' + number).slice(-2);
}
for (let date=0; date<dayNum; date++) {
// for (let date=0; date<1; date++) {
    let dateDep = date+1;
    let dateArr = 0;
    let index = 0;
    for(let i=0; i<airportNum; i++) {
        for(let j=0; j<airportNum; j++) {
            if(j!==i) {
                let ticket = Object.create(template);
                let cost = 0;
                ticket.flightNumber = flightNum[index];
                ticket.departureAirportFsCode = airportCodes[i];
                ticket.arrivalAirportFsCode = airportCodes[j];
                ticket.departureTerminal = termNum[index*2];
                ticket.arrivalTerminal = termNum[index*2+1];
                let timeDep = randomNum(24);
                let flightTime = randomNum(maxTime-minTime)+minTime;
                let timeArr = timeDep + flightTime;
                if (timeArr>=24) {
                    dateArr = dateDep + 1;
                    timeArr = timeArr -24;
                }
                else dateArr = dateDep;
                ticket.departureTime = new Date("2020-04-" + numberToDay(dateDep.toString()) 
                                                + "T" +numberToDay(timeDep.toString()) +":00:00Z") ;
                if(dateArr===31) {
                    ticket.arrivalTime = new Date("2020-05-01"+ "T" +numberToDay(timeArr.toString()) +":00:00Z");
                }
                else {
                    ticket.arrivalTime = new Date("2020-04-" + numberToDay(dateArr.toString()) 
                                                + "T" +numberToDay(timeArr.toString()) +":00:00Z");
                }
                    
                if(i<j) {
                    cost = 200
                }
                else {
                    cost = 600
                }
                ticket.flightcost = randomPlus(100)+cost;
                console.log(JSON.stringify(ticket));
                documents.push(ticket);
                index++; 
            }
        }
    }
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

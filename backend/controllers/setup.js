const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

module.exports = function(app){
    app.get('/api/setup', function(req,res){
        //Connection URL
        const url = "mongodb://localhost:27017/";
        //Airport Code Table
        const airportTable = [
            {city:"Edmonton",code:"YEG"},
            {city:"Ottawa",code:"YOW"},
            {city:"Regina",code:"YQR"},
            {city:"Montreal",code:"YUL"},
            {city:"Vancouver",code:"YVR"}, 
            {city:"Winnipeg",code:"YWG"},
            {city:"Calgary",code:"YYC"},
            {city:"Toronto",code:"YYZ"}
        ]
        // List of airports: Edmonton, Ottawa, Regina, Montreal, Vancouver, Winnipeg, Calgary, Toronto
        const airportCodes = ["YEG", "YOW", "YQR","YUL","YVR", "YWG", "YYC", "YYZ"] 
        const airlines = {"ACA":[], "WJA":[]};
        const airportNum = airportCodes.length;
        const termLimit= 3;
        const dayNum = 61;  //from April 1th to May 31st
        const maxTime = 6;
        const minTime = 2;
        // Database Name
        const dbName = "flightInfo";
        //Objects for storing the data to be written to database
        let data = {documents: "", airportcodes: airportTable};
        const client = new MongoClient(url);
        //Inset airport code and flight info into database 
        const insertDocuments = function(db, callback) {
            // Get the documents collection
            for (let key in data) {
                db.listCollections({name: key})
                .next(function(err, collinfo) {
                    if (collinfo) {
                        // The collection exists
                        db.collection(key).drop(function(err, delOK) {
                            if (err) throw err;
                            if (delOK) console.log(`Collection ${key} deleted`);
                            const collection = db.collection(key);
                            let value = data[key];
                            // Insert some documents
                            collection.insertMany(value, function(err, result) {
                            assert.equal(err, null);
                            assert.equal(value.length, result.result.n);
                            assert.equal(value.length, result.ops.length);
                            console.log(`Inserted ${key} into the collection`);
                            callback(result);
                            });
                        });
                    }
                    else {
                        const collection = db.collection(key);
                        let value = data[key];
                        // Insert some documents
                        collection.insertMany(value, function(err, result) {
                        assert.equal(err, null);
                        assert.equal(value.length, result.result.n);
                        assert.equal(value.length, result.ops.length);
                        console.log(`Inserted ${key} into the collection`);
                        callback(result);
                        });
                    }
                });
            }
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
                flightcost: 200,
                capacity: 2
             }
        let documents = [];
        let termNum = [];
        //Generate flight number array for a specific airline
        function flightGen(num,base) {
            var flightNum = new Array();
            for(let i=0; i<num;i++) {
                let randomNum = 0;
                do {
                    randomNum = Math.floor(Math.random() * 200)+base;
                } 
                while(flightNum.includes(randomNum))
                flightNum.push(randomNum);
            }
            return flightNum;
        }
        //Generate terminal array for all flights
        function terminalGen(termNum) {
            for(let i=0; i<airlines["ACA"].length*2; i++) {
                termNum.push(randomPlus(termLimit))
            }
        }
        airlines["ACA"] = flightGen(airportNum*(airportNum-1),101); //generate flight number for ACA
        airlines["WJA"] = flightGen(airportNum*(airportNum-1),501); // enerate flight number for WJA
        console.log(airlines);
        terminalGen(termNum); //generate terminal info for all flights
        
        function randomNum(limit) {
            return Math.floor(Math.random() * limit);
        }
        function randomPlus(limit) {
            return (Math.floor(Math.random() * limit)+1);
        }
        function numberToDay(number) {
            return ('0' + number).slice(-2);
        }
        function toDate(date,time){
            if(date>61) {
                base = "2020-06-";
                date = date - 61;
            }
            else if(date>30) {
                base = "2020-05-";
                date = date - 30;
            }
            else base = "2020-04-";
            return(base + numberToDay(date.toString()) 
                   + "T" +numberToDay(time.toString()) +":00:00Z"); 
        }
        for (let date=0; date<dayNum; date++) {
        // for (let date=0; date<1; date++) {
            let dateDep = date+1;
            let dateArr = 0;
            let index = 0;
            for(let i=0; i<airportNum; i++) {
                for(let j=0; j<airportNum; j++) {
                    if(j!==i) {
                        for(key in airlines){
                            let ticket = Object.create(template);
                            let cost = 0;
                            ticket.carrierFsCode = key;
                            ticket.flightNumber = airlines[key][index];
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
                            ticket.departureTime = new Date(toDate(dateDep,timeDep));
                            ticket.arrivalTime = new Date(toDate(dateArr,timeArr));  
                            if(i<j) {
                                cost = 200
                            }
                            else {
                                cost = 600
                            }
                            ticket.flightcost = randomPlus(100)+cost;
                            ticket.capacity = randomNum(20) + 2;
                            // console.log(JSON.stringify(ticket));
                            documents.push(ticket);
                        }
                        index++; 
                    }
                }
            }
        }
        data.documents = documents;
        
        //Use connect method to connect to the server
        client.connect(function(err) {
            assert.equal(null,err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            insertDocuments(db, function() {
                client.close();
              });
        });
        //Respond sucess messsage    
        res.json({ message: "Success"});
    })    
}
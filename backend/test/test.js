const MongoClient = require('mongodb').MongoClient;

module.exports = function(app){
    app.get('/api/addTestData', function(req,res){
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if (err) throw err;
            var testData = [
                {
                    "flightNumber" : 283,
                    "departureAirportFsCode" : "YYZ",
                    "arrivalAirportFsCode" : "YEG",
                    "departureTerminal" : 3,
                    "arrivalTerminal" : 2,
                    "departureTime" : "2020-04-02T10:00:00.000Z",
                    "arrivalTime" : "2020-04-02T12:00:00.000Z",
                    "flightcost" : 25,
                    "carrierFsCode" : "ACA",
                    "stops" : 0
                },
                {
                    "flightNumber" : 114,
                    "departureAirportFsCode" : "YEG",
                    "arrivalAirportFsCode" : "YUL",
                    "departureTerminal" : 1,
                    "arrivalTerminal" : 2,
                    "departureTime" :  "2020-04-07T14:00:00.000Z",
                    "arrivalTime" :  "2020-04-07T16:30:00.000Z",
                    "flightcost" : 40,
                    "carrierFsCode" : "ACA",
                    "stops" : 0
                },
                {
                    "flightNumber" : 369,
                    "departureAirportFsCode" : "YUL",
                    "arrivalAirportFsCode" : "YWG",
                    "departureTerminal" : 3,
                    "arrivalTerminal" : 1,
                    "departureTime" :  "2020-04-10T18:45:00.000Z",
                    "arrivalTime" :  "2020-04-10T20:25:00.000Z",
                    "flightcost" : 33,
                    "carrierFsCode" : "ACA",
                    "stops" : 0
                },
                {
                    "flightNumber" : 542,
                    "departureAirportFsCode" : "YWG",
                    "arrivalAirportFsCode" : "YYZ",
                    "departureTerminal" : 1,
                    "arrivalTerminal" : 2,
                    "departureTime" :  "2020-04-14T21:00:00.000Z",
                    "arrivalTime" :  "2020-04-14T23:35:00.000Z",
                    "flightcost" : 52,
                    "carrierFsCode" : "ACA",
                    "stops" : 0
                }
            ]
            const db = database.db('flightInfo')

            const collection = db.collection('documents')
            collection.insert(testData)
            res.json({ message: "Success"});
        })
    })
}
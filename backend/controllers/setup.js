const MongoClient = require('mongodb').MongoClient;

module.exports = function(app){

    app.get('/api/setup', function(req,res){
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if (err) throw err;
            console.log("Connected to db");
            var cities = [
                {
                    city:"toronto",
                    code: "YYZ"
                },
                // {
                //     city:"calgary",
                //     code: "YYC"
                // },
                {
                    city:"montreal",
                    code: "YUL"
                },
                // {
                //     city:"ottawa",
                //     code: "YOW"
                // },
                {
                    city:"vancouver",
                    code: "YVR"
                },
                {
                    city:"winnipeg",
                    code: "YWG"
                },
                // {
                //     city:"quebec",
                //     code: "YQB"
                // },
                // {
                //     city:"saskathoon",
                //     code: "YXE"
                // },
                // {
                //     city:"halifax",
                //     code: "YHZ"
                // },
                {
                    city:"edmonton",
                    code: "YEG"
                }
            ];
            const db = database.db('flightInfo')
    
            const collection = db.collection('airportcodes')
            collection.insert(cities)
            res.json({ message: "Success"});
        })
    })
    
}
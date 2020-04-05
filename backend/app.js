const express = require('express');
const app = express();
var util = require("util");
var childprocess = require("child_process");
const MongoClient = require('mongodb').MongoClient;
var authcontroller = require('./controllers/authentication')
var setupcontroller = require('./controllers/setup')
var testcontroller = require('./controllers/test')
var travellercontroller = require('./controllers/travellersinfo')

var spawn = require("child_process").spawn;

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Custom-Header, X-Requested-With, Content-Type, Accept");

    next();
});

authcontroller(app);
setupcontroller(app);
testcontroller(app);
travellercontroller(app);

// MongoClient.connect("mongodb://localhost:27017/", function(err,database){
//     if(err) throw err;
//     const db = database.db('customerdb')
//     const collection = db.collection('bookinginfo')
//     collection.find({travelStatus: "upcoming"}, function(err, result){
//         if(err) throw err;
//         for()
//     })
// })

app.get('/api/cityinfo', function(req,res){
    console.log("sending city info")
    city = []
    var cityobj = new Object();
    MongoClient.connect("mongodb://localhost:27017/", function(err,database){
        const db = database.db('flightInfo')
        const collection = db.collection('airportcodes')
        collection.find({}).toArray(function(err, result) {
            if(err) throw err;
            for(i=0; i<result.length; i++){
                city.push(result[i].city)
            }
            cityobj.city = city
            console.log(cityobj)
            res.send(cityobj)
        }) 
    })
})

app.post('/api/search', function(req,res){
    console.log(JSON.stringify(req.body))
    var process = spawn('python', ["search.py"]);
    util.log('readingin');
    process.stdin.write(JSON.stringify(req.body));
    process.stdin.end();

    process.stdout.on('data',function(data){
        var stringres = data.toString();
        var jsonres = JSON.parse(JSON.stringify(stringres))
        util.log(jsonres);
        res.send(jsonres);
    });
    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    childprocess.exec('python search.py', function (err){
        if (err) {
            console.log("child processes failed with error code: " + err.code);
            console.log(err);
        }
    });
})

app.post('/api/confirmbooking', function(req, res){
    
    MongoClient.connect("mongodb://localhost:27017/", function(err,database){
        if(err) throw err;
        const db = database.db('customerdb')
        const collection = db.collection('bookinginfo')
        var booking_id = '';
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 6; i > 0; --i){
            booking_id += chars[Math.floor(Math.random() * chars.length)];
        }
        console.log(booking_id);
        var data = req.body;
        data["booking_id"] = booking_id;
        data["travelStatus"] = "upcoming";
        collection.insertOne(data);
        res.json({ booking_id: booking_id, message: "Success"});
    })

    app.get('/api/pastbookings/:username', function(req, res){
    
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if(err) throw err;
            const db = database.db('customerdb')
            const collection = db.collection('bookinginfo')
            collection.findOne({username:req.params.username, travelStatus: "completed"}, function(err, result){
                if(err) throw err;
                res.send(result);
            })
        })
    })

    app.get('/api/upcomingbookings/:username', function(req, res){
    
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if(err) throw err;
            const db = database.db('customerdb')
            const collection = db.collection('bookinginfo')
            collection.findOne({username:req.params.username, travelStatus: "upcoming"}, function(err, result){
                if(err) throw err;
                res.send(result);
            })
        })
    })
    
})
var port = 3000;
app.listen(port, () => 
console.log("Listening to port", port)
)
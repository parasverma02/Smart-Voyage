const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const mongourl = require('./config.js');

var cities;
var util = require("util");
var childprocess = require("child_process");
var spawn = require("child_process").spawn;



var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req,res) => {
    res.send("This will be the response");
});

app.post('/api/signup', (req,res) => {
    MongoClient.connect("mongodb://localhost:27017/", function(err,database){
        if (err) throw err;
        console.log("Connected to db");
        console.log("body is ", req.body);
        var user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber
        };
        const db = database.db('customerdb')

        const collection = db.collection('userdetails')


        collection.findOne({username:req.body.username}, function(err, result){
            console.log("result is ", result);
            if (err){
                throw err;
            } 
            if(result){
                console.log("user exists!");
                res.json({ message: "Username is taken. Please try another one"});
            }
            else{
                collection.insertOne(user);
                console.log("User inserted!");
                res.json({ message: "Success"});
            }
            
        })

    });
})


app.post('/api/signin', (req,res) => {

    MongoClient.connect("mongodb://localhost:27017/", function(err,database){
        if (err) throw err;
        console.log("Connected to db");
        console.log("body is ", req.body);
        const db = database.db('customerdb')
        const collection = db.collection('userdetails')
        collection.findOne({username:req.body.username, password:req.body.password}, function(err, result){
            console.log("result is ", result);
            if(result){
                console.log("Login Successful!");
                res.json({ 
                    success: true,
                    message: "Login Successful!"
                });
            }
            else{
                console.log("Invalid username or password!");
                res.json({ 
                    success: false,
                    message: "Invalid username or password"
                });
            }
            
        })
    });
})

app.post('/api/search', function(req,res){
    for(i=0; i<req.body.cities.length; i++){
        //cities[i] = req.body.cities[i];
        console.log(req.body.cities[i]);
    }
    var process = spawn('python', ["search.py"]);
    util.log('readingin');
    process.stdin.write(JSON.stringify(req.body));
    process.stdin.end();

    process.stdout.on('data',function(data){
        util.log(data.toString());
    });

    childprocess.exec('python search.py', function (err){
        if (err) {
            console.log("child processes failed with error code: " + err.code);
        }
    });
})

var port = 3000;
app.listen(port, () => 
console.log("Listening to port", port)
)
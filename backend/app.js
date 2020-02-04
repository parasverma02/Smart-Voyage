const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const mongourl = require('./config.js');


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
    const client = new MongoClient(mongourl.url, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("voyagedata").collection("userdetails");
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

    collection.findOne({username:req.body.username}, function(err, result){
        console.log("result is ", result);
        if(result){
            console.log("user exists!");
            res.json({ message: "Success"});
        }
        else{
            collection.insertOne(user);
            console.log("User inserted!");
            res.json({ message: "Success"});
        }
        
    })

    client.close();
    });
})

app.post('/api/signin', (req,res) => {

    const client = new MongoClient(mongourl.url, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("voyagedata").collection("userdetails");
    console.log("Connected to db");
    console.log("body is ", req.body);
    collection.findOne({username:req.body.username, password:req.body.password}, function(err, result){
        console.log("result is ", result);
        if(result){
            console.log("Login Successful!");
            res.json({ message: "Login Successful!"});
        }
        else{
            console.log("Invalid username or password!");
            res.json({ message: "Invalid username or password"});
        }
        
    })

    client.close();
    });
})

var port = 3000;
app.listen(port, () => 
console.log("Listening to port", port)
)
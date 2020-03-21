const express = require('express');
const app = express();
var util = require("util");
var childprocess = require("child_process");
var authcontroller = require('./controllers/authentication')
var setupcontroller = require('./controllers/setup')
var testcontroller = require('./controllers/test')

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

app.get('/api/cityinfo', function(req,res){
    console.log("sending city info")
    res.json({
        city: [ "toronto", "montreal", "vancouver", "edmonton", "winnipeg"]
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

var port = 3000;
app.listen(port, () => 
console.log("Listening to port", port)
)
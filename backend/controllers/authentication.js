const MongoClient = require('mongodb').MongoClient;

module.exports = function(app){
    
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
}
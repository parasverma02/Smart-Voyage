const MongoClient = require('mongodb').MongoClient;

module.exports = function(app){
    app.post('/api/addtraveller', function(req, res){
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if (err) throw err;
            const db = database.db('customerdb')
            const collection = db.collection('travellerdetails')
            collection.findOne({username: req.body.username}, function(err, result){
                if(err) throw err;
                if(result==null){
                    console.log("inserting:", req.body);
                    collection.insert(req.body, function(err, body){
                        if(err) throw err;
                    });
                }
                else{
                    collection.update(
                        {username: req.body.username}, 
                        {
                         $push: { travellers: { $each: [ req.body.travellers[0] ] } } 
                        }
                    )
                }
            })
        })
        res.send({ message: "Success"})
    })


    app.get('/api/travellerlist/:username', function(req, res){
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if (err) throw err;
            const db = database.db('customerdb')
            const collection = db.collection('travellerdetails')
            collection.findOne({username: req.params.username}, function(err, result){
                if(err) throw err;
                res.send(result.travellers);
            })
        })
    })

    app.post('/api/removetraveller', function(req, res){
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if (err) throw err;
            const db = database.db('customerdb')
            const collection = db.collection('travellerdetails')
            collection.update({username: req.body.username}, function(err, result){
                if(err) throw err;
            })
        })
        res.send({ message: "Success"})
    })
}
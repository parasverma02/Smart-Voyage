const MongoClient = require('mongodb').MongoClient;

module.exports = function(app){

    app.get('/api/userdetails/:username', function(req, res){
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if (err) throw err;
            const db = database.db('customerdb')
            const collection = db.collection('userdetails')
            collection.findOne({username: req.params.username}, function(err, result){
                if(err) throw err;
                console.log(result);
                res.send(result)
            })
        })
    })
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
                if(result!=null){
                    res.send(result.travellers);
                }
                else{
                    res.send([])
                }

            })
        })
    })

    app.post('/api/removetraveller', function(req, res){
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if (err) throw err;
            const db = database.db('customerdb')
            const collection = db.collection('travellerdetails')
            collection.update({username: req.body.username}, { $pull: { "travellers": { firstname: req.body.firstname } } })
        })
        res.send({ message: "Success"})
    })

    app.post('/api/edittraveller', function(req, res){
        MongoClient.connect("mongodb://localhost:27017/", function(err,database){
            if (err) throw err;
            const db = database.db('customerdb')
            const collection = db.collection('travellerdetails')
            collection.update({username: req.body.username}, { $pull: { "travellers": { firstname: req.body.travellers[0].firstname } } })
            collection.update(
                {username: req.body.username}, 
                {
                 $push: { travellers: { $each: [ req.body.travellers[0] ] } } 
                }
            )
        })
        res.send({ message: "Success"})
    })

}
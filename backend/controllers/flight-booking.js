const MongoClient = require('mongodb').MongoClient;

module.exports=function(app){
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
}
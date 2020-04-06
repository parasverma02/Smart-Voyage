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
            data["booking"][0]["booking_id"] = booking_id;
            data["booking"][0]["travelStatus"] = "upcoming";
            // collection.insertOne(data);
            collection.findOne({username: req.body.username}, function(err, result){
                if(err) throw err;
                if(result==null){
                    collection.insert(data, function(err, body){
                        if(err) throw err;
                    });
                }
                else{
                    collection.update(
                        {username: req.body.username}, 
                        {
                         $push: { booking: { $each: [ data.booking[0] ] } } 
                        }
                    )
                }
            })
            res.json({ booking_id: booking_id, message: "Success"});
        })
    })
    
        app.get('/api/pastbookings/:username', function(req, res){
        
            MongoClient.connect("mongodb://localhost:27017/", function(err,database){
                if(err) throw err;
                const db = database.db('customerdb')
                const collection = db.collection('bookinginfo')
                collection.findOne({username:req.params.username}, function(err, result){
                    if(err) throw err;
                    var ans=[];
                    for(i=0; i<result.booking.length; i++){
                        if(result.booking[i]["travelStatus"]=="completed"){
                            ans.push(result.booking[i]);
                        }
                    }
                    res.send(ans);
                })
            })
        })
    
        app.get('/api/upcomingbookings/:username', function(req, res){
        
            MongoClient.connect("mongodb://localhost:27017/", function(err,database){
                if(err) throw err;
                const db = database.db('customerdb')
                const collection = db.collection('bookinginfo')
                console.log(req.params.username);
                collection.findOne({username:req.params.username}, function(err, result){
                    if(err) throw err;
                    console.log(result);
                    var ans=[];
                    for(i=0; i<result.booking.length; i++){
                        if(result.booking[i]["travelStatus"]=="upcoming"){
                            ans.push(result.booking[i]);
                        }
                    }
                    console.log(ans);
                    res.send(ans);
                })
                // var bookings = collection.find({username:req.params.username}).toArray();
                // console.log(bookings);
                // if (bookings.length > 0){
                //     res.send(bookings);
                // }
                // else{
                //     res.send({});
                // }
            })
        })
        
}
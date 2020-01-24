const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send("This will be the response");
});

var port = 3000;
app.listen(port, () => 
console.log("Listening to port", port)
)
var express = require('express');
var app = express();
var moment = require('moment');
var path = require('path')
var port = 8000
//homepage
app.get('/', function (req, res) {
    var filename = path.join(__dirname, 'index.html');
    res.sendFile(filename, function (err) {
        if (err) {
            return console.error(err)
        }
        console.log("This is the homepage")
    });
});


//input of the page
app.get('/:data', function (req, res) {
    var data = req.params.data;
    var output;
    //Checking if data only has numbers with regex
    if (/^[0-9]*$/.test(data)) {
        output = moment.utc(data, "X")
    }
    else {
        console.log(data)
        output = moment.utc(data, "MMMM DD YYYY")
        console.log(output)
    }

    if (output.isValid()) {
        res.json({
            unix: output.format("X"),
            natural: output.format("MMMM D, YYYY")
        })
    }

    else {
        res.json({
            unix: 'null',
            natural: 'null'
        })
    }


})
app.listen(port)
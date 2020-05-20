'use strict'
// require
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

// user define
const app = express();
const directoryToServe ='client';
const port = 3000;

// Serving static files
app.use('/',express.static(
    path.join(__dirname,'..',directoryToServe)
    )
);

const httpsOptions = {
    cert : fs.readFileSync(path.join(__dirname,'ssl','server.crt')),
    key : fs.readFileSync(path.join(__dirname,'ssl','server.key'))
    // ca : [
    //     fs.readFileSync(path.join(__dirname,'ssl','ca.crt'))
    // ]
};

https.createServer(httpsOptions,app).listen(port,function(){
    
    console.log(`Serving the ${directoryToServe}/directory at https://localhost:${port}`);
});


app.get('/info', function (req, res) {
    console.log(__dirname);
    console.log(path.join(__dirname,'..',directoryToServe));
    console.log(path.join(__dirname,'ssl','server.key'));
    res.send('Hello RESTAPI!');
});
/* 
var server = app.listen(3000, function () {
  var host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  var port = server.address().port;
 
  console.log('listening at http://%s:%s', host, port);
});
*/

var resources = [
    {
        id: 1,
        name: 'Foo'
    }
];
 
app.get('/resources', function(req, res) {
    res.send(resources);
});
 
app.get('/resources/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    var result = resources.filter(r => r.id === id)[0];
 
    if (!result) {
        res.sendStatus(404);
    } else {
        res.send(result);
    }
});

app.post('/resources', function(req, res) {
    var item = req.body;
 
    if (!item.id) {
        return res.sendStatus(500);
    }
 
    resources.push(item);
 
    res.send('/resources/' + item.id);
});
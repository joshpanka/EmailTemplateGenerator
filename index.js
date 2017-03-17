var express = require('express');
var app = express();
var path = require('path');

const PORT_NUMBER = 3000;

app.use('/scripts',
    express.static(path.join(__dirname, '/scripts')));
app.use('/styles',
    express.static(path.join(__dirname, '/styles')));
app.use('/views',
    express.static(path.join(__dirname, '/views')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT_NUMBER, function() {
    console.log("Listening on port: ", PORT_NUMBER);
});

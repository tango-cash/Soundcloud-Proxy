const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// Add headers		
app.use(function (req, res, next) {

    // Website you wish to allow to connect		
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow		
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow		
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent		
    // to the API (e.g. in case you use sessions)		
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware		
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

const SCController = require('./controllers/soundcloud-controller')(app);

const server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("Listening on " + port);
});
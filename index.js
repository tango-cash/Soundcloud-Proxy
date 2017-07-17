const express = require('express');
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

const SCController = require('./controllers/soundcloud-controller')(app);

const server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("Listening on " + port);
});
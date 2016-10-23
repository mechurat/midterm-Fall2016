var express = require('express');
var router = express.Router();
var hbs = require('express-handlebars');

var bodyParser = require('body-parser');
var Mongoose = require('mongoose')

var app = express();
module.exports = router;

require('dotenv').config();

Mongoose.connect(process.env.DB_URL)

var portNum = process.env.PORT || 8888;
app.set('port', portNum);

app.engine('handlebars', hbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



//Get the /home url from the routes folder
app.use('/home', require('./routes/home'));
//Gallery route
app.use('/gallery', require('./routes/gallery'));
//Get the artist model
var artist = require('./routes/artistData');
app.use('/artists', artist);
//Contact route
app.use('/contact', require('./routes/contact'));
//Admin route TEMP: Auto-verification
//Will add verification URL later
app.use('/admin/verified', require('./routes/admin'));



//404 Catch all Error
app.use(function (req, res, next) {
    console.log(err);
    res.status(404);
    res.send('404 - Not Found');
});

app.listen(portNum, function () {
    console.log('listening on port ', portNum);
});
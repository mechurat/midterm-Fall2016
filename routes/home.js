var express = require('express');
var router = express.Router();
module.exports = router;
var app = express();

app.get('/', function (req, res, next) {
    res.status(200);
    res.render('home', {
        company: 'Old Glory Tattoo Co.',
        address: '',
        hours: '',
        phone: '',
        artists: [
            {
                name: '',
                style: '',
                days: '',
                tag: ''
            },
            ],
        facebookURL: '',
        galleryURL: '',
    });
});
var express = require('express');
var router = express.Router();

var path = require('path');
//Multer
var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({
    dest: uploadPath
});

var Artist = require('../../models/artist');

//Gets the AJAX file for display
router.get('/add', function (req, res) {
    res.render('new-artist');
});

router.post('/add', function (req, res) {
    console.log(req.file);
    var artist = new Artist({
        name: req.body.name,
        tag: req.body.tag,
        artStyle: req.body.artStyle
    });

    artist.save(function (err, data) {
        if (err) {
            console.log('err');
            return res.redirect(303, '/admin/verified');
        }
        res.redirect(303, '/admin/verified')
    });
});

router.get('/:artistSlug', function (req, res) {
    Artist.findOne({
        slug: req.params.artistSlug
    }, function (err, data) {
        var pageData = {
            artistData: [data]
        };
    });
});

module.exports = router;
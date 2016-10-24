var express = require('express');
var router = express.Router();
var path = require('path');

var app = express();
app.use(express.static('public'));
//Go and grab the artistSchema
var Artist = require('../models/artist');

//Post the form to select the type of method the admin wants to use
router.get('/', function(req, res){
	var query={};
	Artist.find(query, function(err, data){
		var pageData = {
			artists: data
		};
		res.render('artist-form', pageData);
	});
});

//artist creation
router.get('/', function(req, res){
	res.json({
		status: 'ok'
	});
});
//Post function for form submission
router.post('/', function (req, res) {
    console.log(req.file);
    var artist = new Artist({
        firstName: req.body.firstName,
		lastName: req.body.lastName,
        tag: req.body.tag,
        artStyle: req.body.artStyle,
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

//Post function for document deletion
router.post('/remove', function(req,res){
	Artist.findOneAndRemove( req.body.slug, function(err, artist){
		if(err){
			console.log('error at remove artist');
			return res.redirect(303, '/admin/verified');
		}
		var response = {
			message: "Artist succesfully deleted",
			id: artist._id
		};
		res.send(response);
	});
});

module.exports = router;
//edit function for form submission

//Need:
//authentication
//For now:
//Form selection
//Post
//Get
//Delete
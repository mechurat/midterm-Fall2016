var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    artStyle: String,
    dateCreated:{
        type: Date,
        default: Date.now
    },
});

artistSchema.plugin(URLSlugs('name', {field:'slug'}));

var Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
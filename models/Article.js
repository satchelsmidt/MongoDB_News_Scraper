//import mongoose to create model using schema constructor
var mongoose = require('mongoose');

//extract schema constructor from the mongoose object
var Schema = mongoose.Schema;

//create new schema called 'articleSchema'
var ArticleSchema = new Schema({
    img:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    blurb:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    isSaved:{
        type: Boolean,
        required: true
    },
    note:[{
        type: Schema.Types.ObjectId,
        ref:  'Note'
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
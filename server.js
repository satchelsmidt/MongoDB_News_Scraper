//import express for server setup
var express = require('express')
var path = require("path")

//import mongoogse
var mongoose = require('mongoose')

//Parses our HTML and helps us find elements
var cheerio = require('cheerio')

//Makes HTTP requests for HTMl page
var axios = require('axios')

//import models folder so that db has access to them
db = require("./models")

var PORT = process.env.PORT || 4004;

var app = express()

//middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//redirect client-facing (static) files to the public folder
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://localhost/newsScraperDB", { useNewUrlParser: true });

//store db connection in variable
const dbConnection = mongoose.connection;

//listen for db connection error
dbConnection.on("error", console.error.bind(console, "connection error:"))

//look for db connection success
dbConnection.once('open', () => {
    console.log('connected to mongoose!')
});

//import express handlebars for use
var exphbs = require('express-handlebars');

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars")

//this is home route: hits DB and grabs/displays all articles within
app.get("/", function (req, res) {
    // console.log("COUNT OF ITEMS IN DB:", dbConnection.connection('Article').count)
    db.Article.find({})
        .then(function (dbArticle) {

            var hbsObject = {
                articles: dbArticle
            }
            console.log('this is your handlebar ', hbsObject)

            res.render("index", hbsObject)
        })
        .catch(function (err) {
            res.json(err)
        })
})

//route that collects data from website
app.get("/scrape", function (req, res) {

    //Clear out database before we scrape more data (do not use this)
    // db.Article.deleteMany({})
    //     .then(function () {
    //         console.log("Database Cleared")
    //     })

    //axios call to scrape data from website and put into object format
    axios.get("https://www.theatlantic.com/technology/").then(function (response) {

        var $ = cheerio.load(response.data);

        var result = {};

        $(".c-most-popular__item").each(function (i, element) {

            result.title = $(element).find(".c-most-popular__hed-link").text().trim();
            if (result.title === undefined) {
                return true
            };

            result.img = $(element).find(".c-most-popular__img").attr("data-src");
            if (result.img === undefined) {
                return true
            };

            result.link = $(element).find(".c-most-popular__hed-link").attr("href");
            if (result.link === undefined) {
                return true
            };

            result.blurb = $(element).find(".c-most-popular__dek").text().trim();
            if (result.blurb === undefined) {
                return true
            };

            result.author = $(element).find(".c-most-popular__byline-author-link").text();
            if (result.author === undefined) {
                return true
            };

            //Save articles (to be added at later date)
            // result.isSaved = false

            //Attempt to parse existing db records out, failed
            // db.Article.countDocuments({ title: result.title }, function (err, count) {
            //     console.log("COUNT OF DOCS WITH SAME TITLE: ", count)
            //     if (count > 1) {
            //         return true
            //     }
            // })

            //Create article field in DB
            db.Article.create(result)
                .then(function (dbArticle) {
                    // console.log("THIS IS A DB ARTICLE: ", dbArticle)

                    return
                })
                .catch(function (err) {
                    console.log(err)
                });
        });
        //Alert user when scrape is completed
        console.log("SCRAPE IS FINISHED!")
        res.send("Scrape Completed")
    });
});

//route to return one article
app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        //this line puts in all data from related note object
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        })
})

//route to return all articles
app.get("/articles", function (req, res) {
    db.Article.find({})
        //this line puts in all data from related note object
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        })
})

//create note route
app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            //fulfill the association between then note and the article
            //find the article that is referenced in id
            //reassign note to be the note we just created
            //new: true option returns the updated article. If we do not include this, our query will not return the updated document
            return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { note: dbNote._id }}, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// //this route returns SAVED articles (feature not yet implemented)
// app.get("/articles/saved", function (req, res) {
//     db.Article.find({
//         isSaved: true
//     })
//         //similar to include: [db.Note] that we would see in sequelize
//         //fills in 'note' field with data from the note object fields (rather than jsut a note id)
//         .populate("note")
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

app.listen(PORT, function () {
    console.log("App running at http://localhost:" + PORT)
})
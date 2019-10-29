//import express for server setup
var express = require('express')

//import mongoogse
var mongoose = require('mongoose')

//import axios to make http call to website we are scraping
var axios = require('axios')

//Parses our HTML and helps us find elements
var cheerio = require('cheerio')
//Makes HTTP requests for HTMl page
var axios = require('axios')

axios.get("https://www.theatlantic.com/technology/").then(function (response) {

    var $ = cheerio.load(response.data);

    var results = []

    $(".c-most-popular__item").each(function (i, element) {

        var img = $(element).find(".c-most-popular__img").attr("data-src")

        if (img === undefined) {
            return true
        }

        console.log("IMAGE:", img)

        var link = $(element).find(".c-most-popular__hed-link").attr("href");

        if (link === undefined) {
            return true
        }

        console.log("LINK:", link)

        var title = $(element).find(".c-most-popular__hed-link").text().trim()

        if (title === undefined) {
            return true
        }

        console.log("TITLE:", title)

        var blurb = $(element).find(".c-most-popular__dek").text().trim()

        if (blurb === undefined) {
            return true
        }

        console.log("BLURB:", blurb)

        var author = $(element).find(".c-most-popular__byline-author-link").text()

        if (author === undefined) {
            return true
        }

        console.log("AUTHOR:", author)

        results.push({
            image: img,
            link: link,
            title: title,
            blurb: blurb,
            author: author
        })

        console.log("results array:", results)
    })
})


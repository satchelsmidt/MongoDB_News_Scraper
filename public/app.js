$("#scrapeButton").on("click", function (e) {
    e.preventDefault()

    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function () {
        console.log('congratulations, you got to the second part of your API call')
        $.ajax({
            method: "GET",
            url: "/articles"
        }).then(function (data) {
            console.log('congratulations, you maybe finished your entire api call')
            console.log("DATA?: ", data)

            // var articleList = $("#articleSection")

            // var renderArticles = Handlebars.compile(articleList)

            // articleList.html(renderArticles({
            //     articles: data
            // })) 

            // for (let i = 0; i < data.length; i++) {
            //     var article = {
            //         title: data[i].title,
            //         author: data[i].author,
            //         link: data[i].link,
            //         image: data[i].img,
            //         blurb: data[i].blurb
            //     }

            //     console.log("ARTICLE OR SOMETHING: ", article)
            // }

        })
    })
});

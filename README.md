# MongoDB_News_Scraper

### About

This is a full stack web application that scrapes news articles from The Atlantic Tech Column, displays articles on main app page, and allows users to leave multiple notes on each article. Web scraper used is the Cheerio package. Articles and Notes are saved using MongoDB, and Mongoose is used to make calls between the app and the database. 

App is deployed to Heroku

### Walkthrough

On application load, the user will be presented with a button prompting them to 'Find new Articles'. Upon pressing this button, the application will use cheerio to scrape all new articles from The Atlantic's tech clumn, and will display each article with the following information:
* Title
* Direct link to article
* Snippet
* Image

Each article will also include an 'Add Note' button, that pulls up a modal allowing the user to add persistent notes for each specific article.

Here is a gif showing the note-adding function of the app:
<img src="/public/assets/readme_1.gif" width="600" height="250"/>

### Technology Used

* JavaScript
  * Node.js
  * Express.js
* Templating Engine
  * Handlebars.js
* Web Scraper
  * Cheerio 
* HTML
* CSS
* MongoDB
  * Mongoose ORM

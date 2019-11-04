# MongoDB_News_Scraper
Full-stack web application that scrapes news articles from The Atlantic Tech Column, displays all articles on main app page, and lets users leave multiple notes on each article. Articles and Notes are saved using MongoDB, and Mongoose is used to make calls between the app and the database. 

Notes are tied to each individual article, and referenced by ID. Clicking 'Add Note' on a specific Article will allow the user to create a new note tied to that article (with a title and note body), or to view all of the past notes that are linked to that article. Notes are viewable/saved across users. 

Technologies used in this app include HTML, CSS, Javascript, as well as Node and the express, mongoose, handlebars packages. The database used is MongoDB, and the tempalting engine is Handlebars. 

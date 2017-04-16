var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/GNA');

var Fo4Schema = new mongoose.Schema({
  link: String,
  img: String,
  desc: String,
  title: String,
  source: String,
  sourceImg: String,
  game: String
});

mongoose.model('Fo4', Fo4Schema);

var Fo4 = mongoose.model('Fo4');

app.get('/scrape', function(req, res){

url = 'http://www.pcgamer.com/search/?order_by=newest-first&q=Fallout+4';

request(url, function(error, response, html){
    if(!error){

    var $ = cheerio.load(html);

    var title, desc, img, date, source, sourceImg;

    var json = {articles: []};

    var article = {title: String, desc: String, img: String, date: String, source: String, sourceImg: String};

    $('.results_list').filter(function(){
        var data = $(this);

        data.children().each(function(){
            var child = $(this);
            var article = new Object;
            child.children().each(function(){

              http://localhost:8000/xcom-2-grenadier-builds/

                link = child.children().first().children().attr('href');
                article.link = "http://www.pcgamer.com" + link;

                img = child.children().first().children().children().attr('src');
                article.img = img;

                desc = child.children().last().children().last().children().text();
                article.desc = desc;

                title = child.children().last().children().first().children().text();
                article.title = title;

                source = "PCGamer"
                article.source = source;

                sourceImg = "http://static.spark.futureusmedia.com/pc-gamer/apple-touch-icon-180x180-precomposed.4367af8e8aa8.png"
                article.sourceImg = sourceImg;

                article.game = "Fallout 4";


            })
            json.articles.push(article);
        })



    })

    for(var i = 0; i < json.articles.length; i++){
      var gameInstance = new Fo4(json.articles[i]);
      gameInstance.save(function(err, results){
        if(err) {
          console.log("this is an", err);
        }else{
          console.log("saved", i);
        }
      })
    }

}



// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
//
//     console.log('File successfully written! - Check your project directory for the output.json file');
//
// })

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;
})

app.listen(8000, function() {
  console.log('Listening on port: 8000');
});


exports = module.exports = app;

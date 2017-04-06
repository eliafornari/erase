"use strict"

let express = require("express");
let bodyParser = require('body-parser');
let routes  = require('./routes');
let path = require('path');
var util = require('util');
let ejs = require('ejs');
let app = express();
let prismic = require('./api/prismic');



app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
// app.use(function(req, res, next) {
//     if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
//         res.redirect('https://' + req.get('Host') + req.url);
//     }
//     else
//         next();
// });
app.set('views', __dirname + '/../client');
app.use( express.static(__dirname + "/../client") );
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/api/prismic/get/single', function(req, res){
  prismic.getSingle(req, res);
});

app.get('/api/prismic/get/all', function(req, res){
  prismic.getAll(req, res);
});


app.get('/api/prismic/get/type', function(req, res){
  prismic.getType(req, res);
});




app.get('*', routes.index);

app.listen(8081, () => console.log("listening on 8081"));

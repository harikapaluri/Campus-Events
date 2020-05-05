var express = require('express');
var app = express();
var mongoose = require("mongoose");

var session = require('express-session');
app.set('view engine', 'ejs');

//set the path for static resources to be accessible
app.use('/assets', express.static('assets'));

// using seperate route modules 
var Index = require('./routes/Index.js');
var newConnection= require('./routes/newConnection.js')
var userController= require('./routes/userController.js')

//Connecting to the Db
mongoose.connect("mongodb://localhost/NBAD", { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});

// register the session with it's secret ID
app.use(session({secret: 'harikapaluri'}));
app.use('/newConnection',newConnection);
app.use('/user',userController);
app.use('/',Index);

app.listen(8084,function(){
     console.log('listening on port 8084')
});

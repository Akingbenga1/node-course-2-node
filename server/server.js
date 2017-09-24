var express = require('express');
var bodyParser = require('body-parser');



var mongoose = require('./db/mongoose').mongoose;
var Todo = require('./models/todo').Todo;
var User = require('./models/user').User;

var app = express();
app.use(bodyParser.json());


app.post('/todos', function(req, res){

console.log(req.body);

var todo = new Todo({
	text : req.body.text
});

todo.save().then(function(doc){
	res.send(doc);
}, function(e){
	res.status(400).send(e);

}) 
});

app.listen(3000, function()
{
console.log("Started On port 3000");

});




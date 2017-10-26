require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const _ =  require('lodash');
const port = process.env.PORT;


var mongoose = require('./db/mongoose').mongoose;
var Todo = require('./models/todo').Todo;
var User = require('./models/user').User;
var authenticate = require('./middleware/authenticate').authenticate;

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

app.get('/todos', function(req,res) {

	Todo.find().then(function(todos){
		console.log(todos);
		res.send({todos});
	}, function(e){
		res.status(400).send(e);
	});
});

app.get('/todos/:id', function(req,res) {

	var id = req.params.id;

	if(!ObjectID.isValid(id))
	{
		res.status(404).send("ID is invalid ");
	}
	Todo.findById(id).then(function(todos){
		if(!todos)
		{
			res.status(404).send("Request id not found");
			//return console.log("Id not found");
		}
		//console.log("Todos", todos);
		res.status(200).send(todos);
	}).catch(function(e){
		res.status(404).send("Request not valid");
	});
	// Todo.find().then(function(todos){
	// 	console.log(todos);
	// 	res.send({todos});
	// }, function(e){
	// 	res.status(400).send(e);
	// });
});

app.delete('/todos/:id', function(req,res) {

	var id = req.params.id;

	if(!ObjectID.isValid(id))
	{
		res.status(404).send("ID is invalid ");
	}
	Todo.findByIdAndRemove(id).then(function(todos){
		if(!todos)
		{
			res.status(404).send("Request id not found");
			//return console.log("Id not found");
		}
		//console.log("Todos", todos);
		res.status(200).send(todos);
	}).catch(function(e){
		res.status(404).send("Request not valid");
	});
	// Todo.find().then(function(todos){
	// 	console.log(todos);
	// 	res.send({todos});
	// }, function(e){
	// 	res.status(400).send(e);
	// });
});

app.patch('/todos/:id', function(req,res) {

	var id = req.params.id;
	var body =  _.pick(req.body, ['text', 'completed']);
	if(!ObjectID.isValid(id))
	{
		res.status(404).send("ID is invalid ");
	}
	if(_.isBoolean(body.completed) && body.completed)
	{
		body.completedAt = new Date().getTime();

	}
	else
	{
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(id, {$set: body}, {new : true}).then(function(todos){
		if(!todos)
		{
			res.status(404).send("Request id not found");
			//return console.log("Id not found");
		}
		//console.log("Todos", todos);
		res.status(200).send(todos);
	}).catch(function(e){
		res.status(404).send("Request not valid");
	});
	// Todo.find().then(function(todos){
	// 	console.log(todos);
	// 	res.send({todos});
	// }, function(e){
	// 	res.status(400).send(e);
	// });
});


app.post('/users', function(req,res)
 {

	var body =  _.pick(req.body, ['email', 'password']);
	console.log(body);

	var user = new User(body);

	user.save().then(function(user){
		
		// res.status(200).send(user);
		return user.generateAuthToken();
	}).then(function(token){
			res.header('x-auth', token ).send(user)
	}).catch(function(e){
		res.status(404).send(e);
	});
	
});



app.get('/users/me', authenticate ,  function(req,res){
	res.send(req.user);
});

// User.findByToken();
// user.generateAuthToken()




// app.get('/users', function(req,res) {

// 	User.remove({}).then(function(users){
// 		console.log(users);
// 		res.send({users});
// 	}, function(e){
// 		res.status(400).send(e);
// 	});
// });

app.listen(port, function()
{
console.log("Started on port " + port);

});




module.exports = {app: app};

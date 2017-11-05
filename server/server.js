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


app.post('/todos', authenticate ,  function(req, res){

console.log(req.body);

var todo = new Todo({
	text : req.body.text,
	_creator: req.user._id
});

todo.save().then(function(doc){
	res.send(doc);
}, function(e){
	res.status(400).send(e);

}) 
});

app.get('/todos', authenticate ,  function(req,res) {

	Todo.find({
		_creator : req.user._id
	}).then(function(todos){
		console.log(todos);
		res.send({todos});
	}, function(e){
		res.status(200).send(e);
	});
});


app.get('/users', function(req,res) {

	User.find().then(function(todos){
		console.log(todos);
		res.send({todos});
	}, function(e){
		res.status(200).send(e);
	});
});

app.get('/todos/:id', authenticate , function(req,res) {

	var id = req.params.id;

	if(!ObjectID.isValid(id))
	{
		res.status(404).send("ID is invalid ");
	}
	Todo.findOne({
		_id: id,
		_creator : req.user._id

	}).then(function(todos){
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

app.delete('/todos/:id' , authenticate , function(req,res) {

	var id = req.params.id;

	if(!ObjectID.isValid(id))
	{
		res.status(404).send("ID is invalid ");
	}
	Todo.findOneAndRemove({
			_id : id,
			_creator: req.user._id

		}).then(function(todos){
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

app.patch('/todos/:id' , authenticate , function(req,res) {

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
	Todo.findOneAndUpdate({_id: id, _creator: req.user._id }, {$set: body}, {new : true}).then(function(todos){
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


app.post('/users/login', function(req,res)
{
	var body =  _.pick(req.body, ['email', 'password']);
	// res.send(body);

	User.findByCredentials(body.email, body.password).then(function(user){
		// res.send(user);
		user.generateAuthToken().then(function(token)
		{
			res.header('x-auth', token).send(user);
		});
	}).catch(function(e){
			res.status(400).send();
	});


});


app.delete('/users/me/token', authenticate,  function(req,res)
{

	req.user.removeToken(req.token).then(function(){
		res.status(200).send();
	}, function(){
		res.status(400).send();
	});
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

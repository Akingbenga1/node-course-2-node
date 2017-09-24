const ObjectID = require('mongodb').ObjectID;
const mongoose = require('./../server/db/mongoose').mongoose;

const Todo = require('./../server/models/todo').Todo;

var  id = '59c72462d27368983163473f';

// if(!ObjectID.isValid(id))
// {
// 	console.log("Id not valid");
// }

// Todo.find({
// 	_id: id
// }).then(function(todos){
// 	console.log("Todos", todos);
// });


// Todo.findOne({
// 	_id: id
// }).then(function(todo){
// 	console.log("Todo", todo);
// });


// Todo.findById(id).then(function(todos){
// 	if(!todos)
// 	{
// 		return console.log("Id not found");
// 	}
// 	console.log("Todos", todos);
// }).catch(function(e){
// 	console.log(e);
// });

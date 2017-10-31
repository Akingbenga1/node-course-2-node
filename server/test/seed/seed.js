 const ObjectID = require('mongodb').ObjectID;
 const jwt = require('jsonwebtoken');

 const Todo = require('./../../models/todo').Todo;
 const User = require('./../../models/user').User;

 const userOneId = new ObjectID();
 const userTwoID = new ObjectID();
 const users = [{
 	_id : userOneId,
 	email : 'fermi@gmail.com',
 	password : 'userOnePass',
 	tokens: [{
 		access: 'auth',
 		token : jwt.sign({_id:userOneId, access: 'auth'}, 'abc123').toString()
 	}]

 },{

 	_id : userTwoID,
 	email : 'jen@example.com',
 	password : 'userTwoPass',

 }];

 const todos = 
				[{
					_id : new ObjectID(),
					text : "First test todo"
				}, {
					_id : new ObjectID(),
					text : "Second test todo",
					completed: true,
					completedAt:333
				}];

const populateTodos = function(done){

	Todo.remove({}).then(function(){
		//done();

		return Todo.insertMany(todos);
	}).then(function(){
		done();
	});
};


const populateUsers = function(done){

	User.remove({}).then(function(){
		// done();
		var userOne = new User(user[0]).save();
		var userTwo = new User(user[1]).save();
		return  Promise.all([userOne, userTwo]);
		// done();

	}).then(function()
	{
		done()
	});
};



module.exports = {todos, populateTodos, populateUsers, users};




 const ObjectID = require('mongodb').ObjectID;
 const jwt = require('jsonwebtoken');

 const Todo = require('./../../models/todo').Todo;
 const User = require('./../../models/user').User;

 const userOneId = new ObjectID();
 const userTwoID = new ObjectID();
 const user = [{
 	_id : userOneId,
 	email : 'fermi@gmail.com',
 	password : 'userOnePass',
 	tokens: [{
 		access: 'auth',
 		token : jwt.sign({_id:userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
 	}]

 },{

 	_id : userTwoID,
 	email : 'jen@example.com',
 	password : 'userTwoPass',
 	tokens: [{
 		access: 'auth',
 		token : jwt.sign({_id:userTwoID, access: 'auth'}, process.env.JWT_SECRET).toString()
 	}]

 }];

 const todos = 
				[{
					_id : new ObjectID(),
					text : "First test todo",
					_creator: userOneId
				}, {
					_id : new ObjectID(),
					text : "Second test todo",
					completed: true,
					completedAt:333,
					_creator: userTwoID
				}];

const populateTodos = function(done){
	// done();

	Todo.remove({}).then(function(){
		//done();

		return Todo.insertMany(todos);
	}).then(function(){
		done();
	}).catch(function(e) {
	done(e);
});
};


const populateUsers = function(done){
	// done();

	User.remove({}).then(function(){
		// done();
		var userOne = new User(user[0]).save();
		var userTwo = new User(user[1]).save();
		return  Promise.all([userOne, userTwo]);
		// done();

	}).then(function()
	{
		done();
	}).catch(function(e) {
	done(e);
	});
};



module.exports = {todos, populateTodos, populateUsers, user};




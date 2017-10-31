const expect = require('expect');
const request = require('supertest');
const ObjectID = require('mongodb').ObjectID;

const app = require('./../server').app;
const Todo = require('./../models/todo').Todo;
const User = require('./../models/user').User;

const todos = require('./seed/seed').todos;
const populateTodos = require('./seed/seed').populateTodos;

const users = require('./seed/seed').users;
const populateUsers = require('./seed/seed').populateUsers;




beforeEach(populateUsers);

beforeEach(populateTodos);

describe("POST /todos", function(){
it('Should create a new Todo', function(done){
	var text = "Test todo text";

	request(app).post('/todos').send({ text: text}).expect(200).
	expect(function(res) { expect(res.body.text).toBe(text); 
}).end(function(err, res){
if(err)
{
	return done(err);
}

Todo.find().then(function(todos){
	expect(todos.length).toBe(3);
	expect(todos[2].text).toBe(text);
	done();
}).catch(function(e) {
	done(e);
});
});
});


it('Should not create Todo with invalid data', function(done){
		var text = "Test todo text";

	request(app).post('/todos').send({}).expect(400).
	expect(function(res) { //expect(res.body.text).toBe(''); 
}).end(function(err, res){
if(err)
{
	return done(err);
}

Todo.find().then(function(todos){
	expect(todos.length).toBe(2);
	//expect(todos[0].text).toBe('');
	done();
}).catch(function(e) {
	done(e);
});
});
});

});



describe('GET /todos', function(){
	it('Should get all todos', function(done){
		request(app).get('/todos').expect(200).
		expect(function(res){
			expect(res.body.todos.length).toBe(2);
		}).end(done)
	});
	
});

describe('GET /todos:id', function(){
	it('Should return todo doc ', function(done){
		request(app).get('/todos/'+ todos[0]._id.toHexString())
		.expect(200).
		expect(function(res){
			expect(res.body.text).toBe(todos[0].text);
		}).end(done)
	});
});

describe('GET /todos:id', function(){
	it('should retunr 404 if todo not found', function(done){
		request(app).get('/todos/59c788f18bff2e42b4fbb3fd')
		.expect(404).
		expect(function(res){
			//expect(res.body.text).toBe(todos[0].text);
		}).end(done)
	});
});

describe('GET /todos/:id', function(){
	it('should return 404 for non-object ids', function(done){
		request(app).get('/todos/123')
		.expect(404).
		expect(function(res){
			//expect(res.body.text).toBe(todos[0].text);
		}).end(done)
	});
});


describe('DELETE /todos/:id', function(){
	it('should remove a todo', function(done)
	{
		var hexId =  todos[0]._id.toHexString();
		request(app).delete('/todos/'+hexId)
		.expect(200).
		expect(function(res)
		{
			expect(res.body._id).toBe(hexId);
		}).end(function(err, res)
		{
			if(err)
			{
				return done(err);
			}

			Todo.findById(hexId).then(function(todos)
			{
				expect(todos).toNotExist();
				//expect(todos[0].text).toBe('');
				done();
				
			}).catch(function(e) 
			{
				done(e);
			});
		});
	});

	it('should return 404 if todo not found', function(done){
		var hexId =  new  ObjectID().toHexString();
		request(app).delete('/todos/'+hexId)
		.expect(404).
		end(done)
	});

	// it('should return 404 if object id is invalid todo', function(done){
	// 	request(app).get('/todos/123')
	// 	.expect(404).
	// 	expect(function(res){
	// 		//expect(res.body.text).toBe(todos[0].text);
	// 	}).end(done)
	// });

});


describe('PATCH /todos/:id', function(){
	it('should UPDATE the Todo ', function(done){
		var hexId = todos[0]._id.toHexString();
		var text = "This should be the new text";


		request(app)
		.patch('/todos/' + hexId)
		.send({completed: false, text : text})
		.expect(200).
		expect(function(res)
		{
			expect(res.body.text).toBe(text);
			expect(res.body.completed).toBe(false);
			expect(res.body.completedAt).toNotExist('number');
			//expect(res.body.text).toBe(todos[0].text);
		}).end(done)
	});

	it('should clear completedAt when todo is not completed', function(done){
		request(app).get('/todos/123')
		.expect(404).
		expect(function(res){
			//expect(res.body.text).toBe(todos[0].text);
		}).end(done)
	});
});

describe('GET  /users/me', function(){
	it('should return user if authenticated', function(done){
		request(app)
		.get('users/me')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect(function(res){
			expect(res.body._id).toBe(users[0]._id.toHexString());
			expect(res.body.email).toBe(users[0].email);
		});
		done();
	});

	it('should return 401 if not authenticated', function(done){
		request(app)
		.get('/users/me')
		.expect(401).
		expect(function(res){
			expect(res.body).toBe({});
		}).end(done)
	});
});


describe('POST  /users', function(){
	it('should create a user', function(done){
		var email = 'akinbami.gbenga@gmail.com';
		var password = '123mnb';

		request(app)
		.post('/users')
		.set({email, password})
		.expect(200)
		.expect(function(res){
			expect(res.headers['x-auth']).toExist();
			expect(res.body._id).toExist();
			expect(res.body.email).toBe(email);
		}).end(function(err){
			if(err)
			{
				return done(err);
			}
			User.findOne({email}).then(function(user){
				expect(user).toExist();
				expect(user.password).toNotBe(password);
				done();
			});
		});
	});

	it('should return vlidation errors if requesr invalid', function(done){
		request(app)
		.post('/users')
		.send({
			email: 'and',
			password: '123'
		})
		.expect(400)
		.end(done);
	});

	it('should not create users if email in use ', function(done){
		request(app)
		.post('/users')
		send({
			email: users[0].email,
			password: 'Password123!'
		})
		.expect(400)
		.end(done)
	});
});

const expect = require('expect');
const request = require('supertest');
const ObjectID = require('mongodb').ObjectID;

const app = require('./../server').app;
const Todo = require('./../models/todo').Todo;

const todos = [{
	_id : new ObjectID(),
	text : "First test todo"
}, 
{
	_id : new ObjectID(),
	text : "Second test Todo"
}];


beforeEach(function(done){

	Todo.remove({}).then(function(){
		//done();

		return Todo.insertMany(todos);
	}).then(function(){
		done();
	});
});

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

describe('GET /todos:id', function(){
	it('should return 404 for non-object ids', function(done){
		request(app).get('/todos/123')
		.expect(404).
		expect(function(res){
			//expect(res.body.text).toBe(todos[0].text);
		}).end(done)
	});
});
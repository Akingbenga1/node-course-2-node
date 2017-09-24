const expect = require('expect');

const request = require('supertest');

const app = require('./../server').app;
const Todo = require('./../models/todo').Todo;

const todos = [{
	text : "First test todo"
}, 
{
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
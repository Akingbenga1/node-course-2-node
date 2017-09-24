const expect = require('expect');

const request = require('supertest');

const app = require('./../server').app;
const Todo = require('./../models/todo').Todo;


beforeEach(function(done){

	Todo.remove({}).then(function(){
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
	expect(todos.length).toBe(1);
	expect(todos[0].text).toBe(text);
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
	expect(todos.length).toBe(0);
	//expect(todos[0].text).toBe('');
	done();
}).catch(function(e) {
	done(e);
});
});
});

});
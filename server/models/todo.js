var mongoose  = require('mongoose');

var Todo = mongoose.model('TodosApper', 
{
	text: {type: String, required: true, minlength:1, trim: true},
	 completed: {type : Boolean, default: false},
	completedAt: {type : Number, default: null},
	_creator: {required: true, type: mongoose.Schema.Types.ObjectId}
});

// var newTodo = Todo({
// 	 text: 890,
// 	// completed : false,
// 	// completedAt : 2345
// });

// newTodo.save().then(function(doc){
// 	console.log("Save Todo", doc);

// }, function(e){
// console.log("Unable to save todo");
// });

module.exports = {Todo: Todo};

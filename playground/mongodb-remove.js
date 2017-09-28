const ObjectID = require('mongodb').ObjectID;


var mongoose = require('./../server/db/mongoose').mongoose;
var Todo = require('./../server/models/todo').Todo;
var User = require('./../server/models/user').User;


// Todo.remove({}).then(function(result){

// console.log(result);
// });


Todo.findByIdAndRemove('59cc93e61cb2a8c82029953f').then(function(todo){

console.log(result);
});




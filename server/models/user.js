var mongoose  = require('mongoose');

var User = mongoose.model('Users', 
{
	email: {type: String, required: true, minlength:1, trim: true},
	 name: {type : String, required: true, minlength:2},
});

// var newUser = User({
// 	//email: " akinbami.gbenga@gmail.com ",
// 	name : "Akinbami Akinsola Oluwagbenga",
// });

// newUser.save().then(function(doc){
// 	console.log("Save User", doc);

// }, function(e){
// console.log("Unable to save User");
// });

module.exports = {User: User};
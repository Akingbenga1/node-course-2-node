const  mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema  = new mongoose.Schema({
	email: {

				type: String, 
				required: true, 
				minlength:1, 
				trim: true,
				minlength : 1,
				unique : true,
				validate : 
				{
					validator:  function(value)
					{
						return validator.isEmail(value);
					},
					message :  "{value} is not a valid email"
				}

		  },
	 password: {
	 				type : String,
	 				required: true, 
	 				minlength:6,
	 			},
	tokens: [{
				access: {type: String, required : true,},
				token: {type: String, required : true,}
			}]
});


UserSchema.methods.toJSON = function(){

var user = this;
var userObject = user.toObject();

return _.pick(userObject, ['_id', 'email'] );
};
UserSchema.methods.generateAuthToken = function(){
var user = this;
var access = 'auth';
var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

user.tokens.push({access,token});

return user.save().then( function(){
	return token;
});
};

UserSchema.statics.findByToken = function(token){
var Users = this;
var decoded;
// console.log(token);

try 
{
	decoded = jwt.verify(token, 'abc123');
	//console.log(decoded);
} 
catch(e) {
	// statements
	// console.log(e);
	return new  Promise(function(resolve, reject){
		reject();	
	});
	// return Promise.reject();
};


return User.findOne({

'_id': decoded._id,
'tokens.token' : token,
'tokens.access' : 'auth'

});

};



var User = mongoose.model('Users',  UserSchema);

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
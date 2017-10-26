var {User} = require('./../models/user');

var authenticate = function (req, res, next){

var token = req.header('x-auth');
	// console.log(token);

	User.findByToken(token).then(function(user){
		if(!user)
		{
			res.status(401).send();
		}

		req.user = user;
		req.token = token;

		next();

	}).catch(function(e) { 
		res.status(401).send();
	});
};


module.exports = {authenticate};
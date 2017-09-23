const MongoClient =  require('mongodb').MongoClient;

const Objectid =  require('mongodb').ObjectID;



MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err,db)
	{
		if(err)
		{
			return console.log('Unable to connect to MongoDB server');
		}

		console.log('Connected to MongoDB server');

		// db.collection('Users').findOneAndUpdate({
		// 	_id : new Objectid('59c53a25031c544883382e2b')}, 
		// 	{
		// 		$inc : {age: 10}
		// 	}, {returnOriginal: false}). then(function(result){

		// 		console.log(result);
		// 	});


	

		//db.close();

	});

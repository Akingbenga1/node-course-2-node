const MongoClient =  require('mongodb').MongoClient;

const Objectid =  require('mongodb').ObjectID;



MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err,db)
	{
		if(err)
		{
			return console.log('Unable to connect to MongoDB server');
		}

		console.log('Connected to MongoDB server');
		
		 db.collection('Users').find().toArray().then(function(docs){
		 	console.log("Todos");
		 	console.log(JSON.stringify(docs, undefined,  2));

		 }, function(err){

		 	console.log("Unable to fetch todos", err);
		 });

		//deleteMany

		// db.collection('Todos').findOneAndDelete({text: "Something to do"}).then(function(result)
		// {

		// 	console.log(result);
		// });

		//deleteOne

		//FindOneAndDelete

		//db.close();

	});

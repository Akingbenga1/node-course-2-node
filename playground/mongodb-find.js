const MongoClient =  require('mongodb').MongoClient;

const Objectid =  require('mongodb').ObjectID;



MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err,db)
	{
		if(err)
		{
			return console.log('Unable to connect to MongoDB server');
		}

		console.log('Connected to MongoDB server');

		 // db.collection('Todos').find().toArray().then(function(docs){
		 // 	console.log("Todos");
		 // 	console.log(JSON.stringify(docs, undefined,  2));

		 // }, function(err){

		 // 	console.log("Unable to fetch todos", err);
		 // });

		 //  db.collection('Todos').find({completed:true}).toArray().then(function(docs){
		 // 	console.log("Todos");
		 // 	console.log(JSON.stringify(docs, undefined,  2));

		 // }, function(err){

		 // 	console.log("Unable to fetch todos", err);
		 // });


		 //  db.collection('Todos').find({_id: new Objectid('59c52a730a260a34850632d2')}).toArray().then(function(docs){
		 // 	console.log("Todos");
		 // 	console.log(JSON.stringify(docs, undefined,  2));

		 // }, function(err){

		 // 	console.log("Unable to fetch todos", err);
		 // });


		 //  db.collection('Users').find().count().then(function(count){
		 // 	console.log("Todos counts: " + count);
		 // 	//console.log(JSON.stringify(docs, undefined,  2));

		 // }, function(err){

		 // 	console.log("Unable to fetch todos", err);
		 // }); 

		   db.collection('Users').find({age:30}).count().then(function(count){
		 	console.log("Todos counts: " + count);
		 	//console.log(JSON.stringify(docs, undefined,  2));

		 }, function(err){

		 	console.log("Unable to fetch todos", err);
		 }); 



		//db.close();

	});

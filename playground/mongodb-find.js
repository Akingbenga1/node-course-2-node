const MongoClient =  require('mongodb').MongoClient;

const Objectid =  require('mongodb').ObjectID;



MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err,db)
	{
		if(err)
		{
			return console.log('Unable to connect to MongoDB server');
		}

		console.log('Connected to MongoDB server');

		//  db.collection('Users').insertOne({


		// 	name: "Akinbami Akinsola Oluwagbenga",
		// 	age: 30,
		// 	location: "Egunla Estate, Arigbajo, Ifo, Ogun State",
		// 	//completed : false
		// }, function(err, result)
		// {
		//   if(err)
		//   {
		//   	return console.log('Unable to insert todo', err);
		//   }
		//   console.log(JSON.stringify(result.ops[0]._id, undefined, 2))

		// });

		  db.collection('Todos').find().toArray().then(function(docs){
		 	console.log("Todos");
		 	console.log(JSON.stringify(docs, undefined,  2));

		 }, function(err){

		 	console.log("Unable to fetch todos", err);
		 });


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

		   db.collection('Todos').find().count().then(function(count){
		 	console.log("Todos counts: " + count);
		 	//console.log(JSON.stringify(docs, undefined,  2));

		 }, function(err){

		 	console.log("Unable to fetch todos", err);
		 }); 



		//db.close();

	});

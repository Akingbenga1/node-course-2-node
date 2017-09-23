const MongoClient =  require('mongodb').MongoClient;

// var user = {name: "Gbenga", age:25};

// var {name} = user;



MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err,db)
	{
		if(err)
		{
			return console.log('Unable to connect to MongoDB server');
		}

		console.log('Connected to MongoDB server');

		db.collection('Todos').insertOne({

			text: "Something to do",
			completed : false
		}, function(err, result)
		{
		  if(err)
		  {
		  	return console.log('Unable to insert todo', err);
		  }
		  console.log(JSON.stringify(result.ops, undefined, 2))

		});


// db.collection('Users').insertOne({


// 			name: "Akinbami Akinsola Oluwagbenga",
// 			age: 30,
// 			location: "Egunla Estate, Arigbajo, Ifo, Ogun State",
// 			//completed : false
// 		}, function(err, result)
// 		{
// 		  if(err)
// 		  {
// 		  	return console.log('Unable to insert todo', err);
// 		  }
// 		  console.log(JSON.stringify(result.ops[0]._id, undefined, 2))

// 		});

db.collection('Todos').insertOne({


			text: "Eat Launch",
			competed: false
			//completed : false
		}, function(err, result)
		{
		  if(err)
		  {
		  	return console.log('Unable to insert todo', err);
		  }
		  console.log(JSON.stringify(result.ops[0]._id, undefined, 2))

		});

		db.close();

	});

var MongoClient = require('../promisifiedMongoClient');

var format = require('util').format;

var client = MongoClient.connectAsync('mongodb://localhost:27017/Reality')
	.then(function(db) {
		return {
			db: db,
			collection: db.collection('test')
		};
	})
	.then(function(tuple) {
		// console.dir(tuple);

		return tuple.collection.find().toArrayAsync()
			.then(function(array) {
				console.dir(array);
				return tuple;
			});
	})
	.then(function(tuple) {
		tuple.db.close();
		console.log('db closed');
	});


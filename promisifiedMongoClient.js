var Promise = require('bluebird');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Collection = mongodb.Collection;

// promisify
Promise.promisifyAll(Collection.prototype);
Promise.promisifyAll(MongoClient);
// http://stackoverflow.com/a/23771854
Collection.prototype._find = Collection.prototype.find;
Collection.prototype.find = function() {
	var cursor = this._find.apply(this, arguments);
	cursor.toArrayAsync = Promise.promisify(cursor.toArray, cursor);
	cursor.countAsync = Promise.promisify(cursor.count, cursor);
	return cursor;
};

module.exports = MongoClient;
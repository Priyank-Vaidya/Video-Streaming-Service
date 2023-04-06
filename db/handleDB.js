const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const GridFSBucket = mongodb.GridFSBucket;


//
const uri = 'mongodb://localhost:27017/mydatabase';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db, bucket;

client.connect(err => {
  if (err) throw err;

  db = client.db('mydatabase');
  bucket = new GridFSBucket(db);
});
module.exports = {db, bucket};
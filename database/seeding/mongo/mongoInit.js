const Generate = require('../fakeDataGen.js');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost/SDC';

var dummy = {
  name: 'Hack Reactor',
  price: 20000,
  imgUrl: 'https://loremflickr.com/320/240/school',
  featured: true,
  visited: true,
  category: 'Education',
  type: 'Bootcamp'
};

MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
  if (err) {
    console.log(err);
  }
  var db = client.db('SDC');
  db.dropCollection('products')
    .then(() => {
      return db.createCollection('products');
    })
    .then(collection => {
      return collection.insertOne(dummy);
    })
    .then(response => {
      console.log(response.ops);
      client.close();
    })
    .catch(err => {
      console.log(err);
    });
});
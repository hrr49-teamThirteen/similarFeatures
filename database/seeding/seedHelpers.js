const { Client } = require('pg');
var { database, user, password, address } = require('../config/config.js');
const Generate = require('./fakeDataGen.js');
const Query = require('./seedQueries/queries.js');

const client = new Client(`postgres://${user}:${password}@${address}/${database}`);

const fillTypes = (n) => {
  return client.connect()
    .then(() => {
      return client.query(Query.typesTable);
    })
    .then(() => {
      var types = Generate.createProductTypes(n);
      var queries = [];
      for (var i = 0; i < types.length; i++) {
        queries.push(client.query('INSERT INTO Types (name) VALUES ($1);', [types[i]]));
      }
      return Promise.all(queries);
    })
    .then(results => {
      console.log('Types Filled');
    })
    .catch(err => {
      console.log(err);
    });
};

const fillCategories = (n) => {
  return client.query(Query.categoryTable)
    .then(() => {
      var categories = Generate.createCategories(n);
      var queries = [];
      for (var i = 0; i < categories.length; i++) {
        queries.push(client.query('INSERT INTO Categories (name) VALUES ($1);', [categories[i]]));
      }
      return Promise.all(queries);
    })
    .then(results => {
      console.log('Catgories Filled');
    })
    .catch(err => {
      console.log(err);
    });
};

const fillProducts = () => {
  return client.query(Query.productsTable)
    .then(() => {
      return Generate.createProductsCSV();
    })
    .then(response => {
      console.log('\n', response);
      client.end();
    })
    .catch(err => {
      console.log(err);
    });
};


module.exports = {
  fillTypes,
  fillProducts,
  fillCategories
};


/* COPY products (id, name, price, "imageUrl", featured, "typeId", "categoryId")
FROM '/home/gvsalinas/SDC/SimilarFeaturedCarousel/database/seeding/postgres/postgres.csv'
DELIMITER ',' CSV HEADER; */

//const copyFrom = require('pg-copy-streams').from;
//const fs = require('fs');

/* const csvToDB = (done) => {
  var stream = client.query(copyFrom('COPY products (id, name, price, "imageUrl", featured, "typeId", "categoryId") FROM STDIN'));
  var fileStream = fs.createReadStream(__dirname + '/postgres.csv');
  fileStream.on('error', done);
  stream.on('error', done);
  stream.on('finish', done);
  fileStream.pipe(stream);
}; */
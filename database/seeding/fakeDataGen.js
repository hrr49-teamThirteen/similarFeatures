/* eslint-disable func-style */
const faker = require('faker');
const fs = require('fs');

const createCategories = (n) => {
  var categories = new Set();
  var categoryModels = [];
  for (var i = 0; i < n; i++) {
    categories.add(faker.commerce.department());
  }
  for (let category of categories) {
    categoryModels.push({name: category});
  }
  return categoryModels;
};

const createProductTypes = (n) => {
  var productTypes = new Set();
  var typeModels = [];
  for (var i = 0; i < n; i++) {
    productTypes.add(faker.commerce.product());
  }
  for (let type of productTypes) {
    typeModels.push({name: type});
  }
  return typeModels;
};

const createProduct = (i, database) => {
  if (database === 'mongo') {
    var product = [
      faker.commerce.productName(),
      faker.commerce.price(),
      faker.image.image(),
      Math.floor(Math.random() * 2),
      faker.commerce.department(),
      faker.commerce.product()
    ];
  } else {
    var product = [
      i,
      faker.commerce.productName(),
      faker.commerce.price(),
      faker.image.image(),
      Math.floor(Math.random() * 2),
      faker.random.number({min: 1, max: 24}),
      faker.random.number({min: 1, max: 22})
    ];
  }
  return product;
};

function createProductsCSV (database) {
  return new Promise((resolve, reject) => {
    if (database === 'mongo') {
      var writeStream = fs.createWriteStream('database/seeding/mongo/mongo.csv', 'utf8');
      writeStream.write('name, price, imgUrl, featured, visited, category, type\n', 'utf8');
    } else {
      var writeStream = fs.createWriteStream('database/seeding/postgres/postgres.csv', 'utf8');
      writeStream.write('id, name, price, imgUrl, featured, visited, categoryId, typeId\n', 'utf8');
    }
    let i = 0;
    const MAX_RECORDS = 10000000;

    function write() {
      let space = true;
      while (space && i < MAX_RECORDS) {
        i += 1;
        var data = createProduct(i, database).join(',') + '\n';
        if (i === MAX_RECORDS) {
          writeStream.write(data, 'utf-8', () => {
            writeStream.end();
            resolve('CSV Done');
          });
        } else {
          space = writeStream.write(data, 'utf-8');
        }
      }

      if (i < MAX_RECORDS) {
        process.stdout.write(`\r\x1b[KProducts written to CSV: ${Math.ceil((i / MAX_RECORDS) * 100)}%`);
        writeStream.once('drain', write);
      }
    }
    write();
  });
}

module.exports = {
  createProduct,
  createProductsCSV,
  createCategories,
  createProductTypes
};
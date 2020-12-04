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

const createProduct = (i) => {
  return [
    i,
    faker.commerce.productName(),
    faker.commerce.price(),
    faker.image.image(),
    Math.floor(Math.random() * 2),
    faker.random.number({min: 1, max: 24}),
    faker.random.number({min: 1, max: 22})
  ];
};

function createProductsCSV () {
  return new Promise((resolve, reject) => {
    let writeStream = fs.createWriteStream('database/seeding/postgres.csv', 'utf8');
    writeStream.write('id, price, imgUrl, featured, featured, visited, categoryId, typeId\n', 'utf8');
    let i = 10000000;

    function write() {
      let space = true;
      while (space && i > 0) {
        i -= 1;
        var data = createProduct(i).join(',') + '\n';
        if (i === 0) {
          writeStream.write(data, 'utf-8', () => {
            writeStream.end();
            resolve('CSV Done');
          });
        } else {
          space = writeStream.write(data, 'utf-8');
        }
      }

      if (i > 0) {
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
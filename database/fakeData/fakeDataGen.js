/* eslint-disable func-style */
const faker = require('faker');
const fs = require('fs');

const createCategories = (n) => {
  var categories = [];
  for (var i = 0; i < n; i++) {
    categories.push(faker.commerce.department());
  }
  return categories;
};

const createProductTypes = (n) => {
  var productTypes = [];
  for (var i = 0; i < n; i++) {
    productTypes.push(faker.commerce.product());
  }
  return productTypes;
};

const createProduct = () => {
  return [
    faker.commerce.productName(),
    faker.commerce.price(),
    faker.image.image(),
    Math.floor(Math.random() * 2),
    faker.commerce.department(),
    faker.commerce.product()
  ];
};


function createProductsCSV () {
  var writeStream = fs.createWriteStream('products.csv', 'utf8');
  writeStream.write('id, price, imgUrl, featured, featured, visited, categoryId, typeId\n', 'utf8');
  let i = 10000000;

  function write() {
    let space = true;
    while (space && i > 0) {
      i -= 1;
      var data = createProduct().join(',') + '\n';
      if (i === 0) {
        console.log(i);
        writeStream.write(data, 'utf-8', () => {
          writeStream.end();
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
}

module.exports = {
  createProduct,
  createCategories,
  createProductTypes
};
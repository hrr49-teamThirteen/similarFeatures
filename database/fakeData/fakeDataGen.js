var faker = require('faker');

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

const createProducts = (n) => {
  var products = [];
  for (var i = 0; i < n; i++) {
    products.push([
      faker.commerce.productName(),
      faker.commerce.price(),
      faker.image.image(),
      Math.floor(Math.random() * 2),
      faker.commerce.department(),
      faker.commerce.product()
    ]);
  }
  return products;
};

module.exports = {
  createProducts,
  createCategories,
  createProductTypes
};
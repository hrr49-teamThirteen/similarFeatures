const { database, user, password, address } = require('./config/config.js');
const Query = require('./queries.js');
const { Client } = require('pg');

const client = new Client(`postgres://${user}:${password}@${address}/${database}`);

(async function createConnection() {
  await client.connect();
})();

const getDataWithPType = (productId) => {
  return client.query('SELECT type_id FROM products WHERE id = $1;', [productId])
    .then(result => {
      var type = result.rows[0].type_id;
      return client.query(Query.PTypeQuery, [type]);
    })
    .catch(err => {
      console.log(err);
    });
};

const getDataWithCategory = (productId, cb) => {
  return client.query('SELECT category_id FROM products WHERE id = $1;', [productId])
    .then(result => {
      var category = result.rows[0].category_id;
      return client.query(Query.CategoryQuery, [category]);
    })
    .catch(err => {
      console.log(err);
    });
};

const getFeaturedData = (productId) => {
  return client.query('SELECT category_id FROM products WHERE id = $1;', [productId])
    .then(result => {
      var category = result.rows[0].category_id;
      return client.query(Query.FeaturedQuery, [category]);
    })
    .catch(err => {
      console.log(err);
    });
};

const createProduct = ({name, price, image, featured, visited, categoryId, typeId}) => {
  var values = [name, price, image, featured, visited, categoryId, typeId];
  return client.query(Query.create, values);
};

const updateProduct = (productId, field, val) => {
  var values = [val, productId];
  return client.query(Query.update(field), values);
};

const deleteProduct = (productId) => {
  return client.query(Query.remove, [productId]);
};

module.exports = {
  getDataWithPType,
  getDataWithCategory,
  getFeaturedData,
  createProduct,
  updateProduct,
  deleteProduct
};

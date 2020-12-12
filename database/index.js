const { database, user, password, address } = require('./config/config.js');
const Query = require('./queries.js');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: `postgres://${user}:${password}@${address}/${database}`
});

const getDataWithPType = (productId) => {
  return pool.connect()
    .then(client => {
      return client.query('SELECT type_id FROM products WHERE id = $1;', [productId])
        .then(result => {
          var type = result.rows[0].type_id;
          return client.query(Query.PTypeQuery, [type]);
        })
        .then(results => {
          client.release();
          return results;
        });
    })
    .catch(err => {
      client.release();
      console.log(err);
    });
};

const getDataWithCategory = (productId) => {
  return pool.connect()
    .then(client => {
      return client.query('SELECT category_id FROM products WHERE id = $1;', [productId])
        .then(result => {
          var category = result.rows[0].category_id;
          return client.query(Query.CategoryQuery, [category]);
        })
        .then(results => {
          client.release();
          return results;
        });
    })
    .catch(err => {
      client.release();
      console.log(err);
    });
};

const getFeaturedData = (productId) => {
  return pool.connect()
    .then(client => {
      return client.query('SELECT category_id FROM products WHERE id = $1;', [productId])
        .then(result => {
          var category = result.rows[0].category_id;
          return client.query(Query.FeaturedQuery, [category]);
        })
        .then(results => {
          client.release();
          return results;
        });
    })
    .catch(err => {
      client.release();
      console.log(err);
    });
};

const createProduct = ({name, price, image, featured, visited, categoryId, typeId}) => {
  var values = [name, price, image, featured, visited, categoryId, typeId];
  return pool.query(Query.create, values);
};

const updateProduct = (productId, field, val) => {
  var values = [val, productId];
  return pool.query(Query.update(field), values);
};

const deleteProduct = (productId) => {
  return pool.query(Query.remove, [productId]);
};

module.exports = {
  getDataWithPType,
  getDataWithCategory,
  getFeaturedData,
  createProduct,
  updateProduct,
  deleteProduct
};

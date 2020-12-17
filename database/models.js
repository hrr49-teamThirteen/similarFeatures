const { database, user, password, address } = require('./config/config.js');
const { Pool } = require('pg');
const Query = require('./queries.js');
const Redis = require('../cache/redis.js');
const pool = new Pool({
  connectionString: `postgres://${user}:${password}@${address}/${database}`,
  idleTimeoutMillis: 5000
});

const getType = (productId) => {
  return pool.connect()
    .then(client => {
      return client.query('SELECT type_id FROM products WHERE id = $1;', [productId])
        .then(result => {
          return [client, result.rows[0].type_id];
        })
        .catch(err => {
          client.release();
          console.log(err);
        });
    })
    .catch(err => { console.log(err); });
};

const getCategory = (productId) => {
  return pool.connect()
    .then(client => {
      return client.query('SELECT category_id FROM products WHERE id = $1;', [productId])
        .then(result => {
          return [client, result.rows[0].category_id];
        })
        .catch(err => {
          client.release();
          console.log(err);
        });
    })
    .catch(err => { console.log(err); });
};

const getTypeGroup = (client, type) => {
  return client.query(Query.PTypeQuery, [type])
    .then(results => {
      client.release();
      Redis.setGroup(`type:${type}`, results.rows);
      return results.rows;
    })
    .catch(err => {
      client.release();
      console.log(err);
    });
};

const getCategoryGroup = (client, category) => {
  return client.query(Query.CategoryQuery, [category])
    .then(results => {
      client.release();
      Redis.setGroup(`category:${category}`, results.rows);
      return results.rows;
    })
    .catch(err => {
      client.release();
      console.log(err);
    });
};

const getFeaturedGroup = (client, category) => {
  return client.query(Query.FeaturedQuery, [category])
    .then(results => {
      client.release();
      Redis.setGroup(`featured:${category}`, results.rows);
      return results.rows;
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
  getType,
  getCategory,
  getTypeGroup,
  getCategoryGroup,
  getFeaturedGroup,
  createProduct,
  updateProduct,
  deleteProduct
};

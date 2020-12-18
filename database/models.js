const { database, user, password, address } = require('./config/config.js');
const { Pool } = require('pg');
const Query = require('./queries.js');
const Redis = require('../cache/redis.js');
const pool = new Pool({
  connectionString: `postgres://${user}:${password}@${address}/${database}`,
});

const getType = (productId) => {
  return pool.query('SELECT type_id FROM products WHERE id = $1;', [productId])
    .then(result => {
      return result.rows[0].type_id;
    })
    .catch(err => {
      console.log(err);
    });
};

const getCategory = (productId) => {
  return pool.query('SELECT category_id FROM products WHERE id = $1;', [productId])
    .then(result => {
      return result.rows[0].category_id;
    })
    .catch(err => {
      console.log(err);
    });
};

const getTypeGroup = (type) => {
  return pool.query(Query.PTypeQuery, [type])
    .then(results => {
      Redis.setGroup(`type:${type}`, results.rows);
      return results.rows;
    })
    .catch(err => {
      console.log(err);
    });
};

const getCategoryGroup = (category) => {
  return pool.query(Query.CategoryQuery, [category])
    .then(results => {
      Redis.setGroup(`category:${category}`, results.rows);
      return results.rows;
    })
    .catch(err => {
      console.log(err);
    });
};

const getFeaturedGroup = (category) => {
  return pool.query(Query.FeaturedQuery, [category])
    .then(results => {
      Redis.setGroup(`featured:${category}`, results.rows);
      return results.rows;
    })
    .catch(err => {
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

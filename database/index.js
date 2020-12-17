const Redis = require('../cache/redis.js');
const PG = require('./models.js');

const getDataWithPType = (productId) => {
  return PG.getType(productId)
    .then(result => {
      var [client, type] = result;
      return Redis.getGroup(`type:${type}`)
        .then(cache => {
          if (cache) {
            client.release();
            return JSON.parse(cache);
          } else {
            return PG.getCategoryGroup(client, type);
          }
        })
        .catch(err => console.log(err));
    });
};

const getDataWithCategory = (productId) => {
  return PG.getCategory(productId)
    .then(result => {
      var [client, category] = result;
      return Redis.getGroup(`category:${category}`)
        .then(cache => {
          if (cache) {
            client.release();
            return JSON.parse(cache);
          } else {
            return PG.getCategoryGroup(client, category);
          }
        })
        .catch(err => console.log(err));
    });
};

const getFeaturedData = (productId) => {
  return PG.getCategory(productId)
    .then(result => {
      var [client, category] = result;
      return Redis.getGroup(`featured:${category}`)
        .then(cache => {
          if (cache) {
            client.release();
            return JSON.parse(cache);
          } else {
            return PG.getCategoryGroup(client, category);
          }
        })
        .catch(err => console.log(err));
    });
};

const {createProduct, updateProduct, deleteProduct} = PG;

module.exports = {
  getDataWithPType,
  getDataWithCategory,
  getFeaturedData,
  createProduct,
  updateProduct,
  deleteProduct
};

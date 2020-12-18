const Redis = require('../cache/redis.js');
const PG = require('./models.js');

const getDataWithPType = (productId) => {
  return PG.getType(productId)
    .then(type => {
      return Redis.getGroup(`type:${type}`)
        .then(cache => {
          if (cache) {
            return JSON.parse(cache);
          } else {
            return PG.getTypeGroup(type);
          }
        })
        .catch(err => console.log(err));
    });
};

const getDataWithCategory = (productId) => {
  return PG.getCategory(productId)
    .then(category => {
      return Redis.getGroup(`category:${category}`)
        .then(cache => {
          if (cache) {
            return JSON.parse(cache);
          } else {
            return PG.getCategoryGroup(category);
          }
        })
        .catch(err => console.log(err));
    });
};

const getFeaturedData = (productId) => {
  return PG.getCategory(productId)
    .then(category => {
      return Redis.getGroup(`featured:${category}`)
        .then(cache => {
          if (cache) {
            return JSON.parse(cache);
          } else {
            return PG.getFeaturedGroup(category);
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

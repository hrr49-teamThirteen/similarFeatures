const { Sequelize, DataTypes } = require('sequelize');
const Generate = require('./fakeDataGen.js');
var { database, user, password } = require('../config/config.js');

const sequelize = new Sequelize(`postgres://${user}:${password}@localhost:5432/SDC`);

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: false
});

const productType = sequelize.define('productType', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: false
});

const product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(7, 2),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  visited: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false
});

var addTables = async function() {
  await sequelize.sync();
  await sequelize.close();
};

/* const fillProductTypes = async (n) => {
  var productTypes = Generate.createProductTypes(n);

  var qString = 'INSERT IGNORE INTO productTypes (Name) VALUES (?)';
  for (var i = 0; i < productTypes.length; i++) {
    await connection.query(qString, [productTypes[i]], (err, res) => {
      if (err) { return console.log(err); }

    });
    console.log(`filling ProductTypes ${i + 1} of ${n}`);
  }
  // console.log('all stored');
};

const fillCategories = async (n) => {
  var categories = Generate.createCategories(n);
  var qString = 'INSERT IGNORE INTO categories (Name) VALUES (?)';
  for (var i = 0; i < categories.length; i++) {
    await connection.query(qString, [categories[i]], (err, res) => {
      if (err) { return console.log(err); }
    });
    console.log(`filling Categories ${i + 1} of ${n}`);
  }
};

const fillProducts = async (n) => {
  var products = Generate.createProducts(n);
  var qString = 'INSERT IGNORE INTO products (description, price, imageUrl, featured, category_id, productType_id) VALUES (?, ?, ? ,? ,(SELECT id FROM categories WHERE categories.name = ?), (SELECT id FROM productTypes WHERE productTypes.name = ?))';
  for (var i = 0; i < products.length; i++) {
    await connection.query(qString, products[i], (err, res) => {
      if (err) { return console.log(err); }
    });
    console.log(`filling Products ${i + 1} of ${n}`);
  }
  connection.end();
}; */


module.exports = {
  fillProductTypes,
  fillProducts,
  fillCategories
};

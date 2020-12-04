const { Sequelize, DataTypes } = require('sequelize');
const { Client } = require('pg');
var { database, user, password } = require('../../config/config.js');
const Generate = require('../fakeDataGen.js');

const sequelize = new Sequelize(`postgres://${user}:${password}@localhost:5432/${database}`);
const client = new Client(`postgres://${user}:${password}@localhost:5432/${database}`);

const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: false
});

const Type = sequelize.define('type', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: false
});

const Product = sequelize.define('product', {
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
    defaultValue: false
  }
}, {
  timestamps: false
});

Product.belongsTo(Type);
Type.hasOne(Product);
Product.belongsTo(Category);
Category.hasOne(Product);

const fillTypes = (n) => {
  return Type.sync({force: true})
    .then(() => {
      var types = Generate.createProductTypes(n);
      return Type.bulkCreate(types);
    })
    .catch(err => {
      console.log(err);
    });
};

const fillCategories = (n) => {
  return Category.sync({force: true})
    .then(() => {
      var categories = Generate.createCategories(n);
      return Category.bulkCreate(categories);
    })
    .catch(err => {
      console.log(err);
    });
};

const copy = `COPY products (id, name, price, "imageUrl", featured, "typeId", "categoryId")
              FROM "/home/gvsalinas/SDC/SimilarFeaturedCarousel/database/fakeData/products.csv"
              DELIMITER ',' CSV HEADER`;

const fillProducts = () => {
  return Product.sync({force: true})
    .then(() => {
      return Generate.createProductsCSV();
    })
    .then(response => {
      console.log(response);
      return client.query(copy)
        .then(response => {
          console.log('Seeding Done');
        })
        .catch(err => {
          console.log(err);
        });
    })
    .then(() => {
      client.end();
      sequelize.close();
    })
    .catch(err => {
      console.log(err);
    });
};


module.exports = {
  fillTypes,
  fillProducts,
  fillCategories
};

/* COPY products (id, name, price, "imageUrl", featured, "typeId", "categoryId")
FROM '/home/gvsalinas/SDC/SimilarFeaturedCarousel/database/seeding/postgres.csv'
DELIMITER ',' CSV HEADER; */
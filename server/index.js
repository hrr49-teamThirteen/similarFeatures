const express = require ('express');
const _ = require ('underscore');
const db = require ('../database/index.js');

const app = express();
app.use(express.static('public/dist'));
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/api/carousel/:productid/moreToConsider', (req, res) => {
  var productid = parseInt(req.params.productid);
  db.getDataWithPType(productid, (data) => {
    res.json(data);
  });
});

app.get('/api/carousel/:productid/similar', (req, res) => {
  var productid = parseInt(req.params.productid);
  db.getDataWithCategory(productid, (data) => {
    res.json(data);
  });
});

app.get('/api/carousel/:productid/featured', (req, res) => {
  var productid = parseInt(req.params.productid);
  db.getDataWithCategory(productid, (data) => {
    var filteredData = _.filter(data, (item) => {
      return item.featured;
    });
    res.json(filteredData);
  });
});

app.post('/api/carousel/', (req, res) => {
  //db.createProduct()
  res.send('Creating new product');
});

app.put('/api/carousel/:productid', (req, res) => {
  //db.updateField()
  res.send('Updating product field');
});

app.delete('/api/carousel/:productid', (req, res) => {
  //db.deleteProduct()
  res.send('Deleting product');
});


module.exports = app;
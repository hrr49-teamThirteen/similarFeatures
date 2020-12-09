const express = require ('express');
const _ = require ('underscore');
const db = require ('../database/index.js');
const bodyparser = require('body-parser');

const app = express();
app.use(express.static('public/dist'));
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/api/carousel/:productid/moreToConsider', (req, res) => {
  var productid = parseInt(req.params.productid);
  db.getDataWithPType(productid)
    .then(results => {
      res.json(results.rows).end();
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/api/carousel/:productid/similar', (req, res) => {
  var productid = parseInt(req.params.productid);
  db.getDataWithCategory(productid)
    .then(results => {
      res.json(results.rows).end();
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/api/carousel/:productid/featured', (req, res) => {
  var productid = parseInt(req.params.productid);
  db.getFeaturedData(productid)
    .then(results => {
      res.json(results.rows).end();
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/api/carousel/', (req, res) => {
  db.createProduct(req.body)
    .then(result => {
      res.json(result.rows[0]).end();
    })
    .catch(err => {
      console.log(err);
    });
});

app.put('/api/carousel/:productid', (req, res) => {
  var productid = parseInt(req.params.productid);
  db.updateProduct(productid, req.body.field, req.body.val)
    .then(result => {
      res.json(result.rows[0]).end();
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/api/carousel/:productid', (req, res) => {
  var productid = parseInt(req.params.productid);
  db.deleteProduct(productid)
    .then(result => {
      res.json(result.rows[0]).end();
    })
    .catch(err => {
      console.log(err);
    });
});


module.exports = app;
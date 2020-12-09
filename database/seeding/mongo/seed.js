const db = require('./mongoInit.js');
const Generate = require('../fakeDataGen.js');
const uri = 'mongodb://localhost/SDC';

Generate.createProductsCSV('mongo')
  .then(response => {
    console.log('\n', response);
  });





//let {exec} = require('child_process');
const db = require('./mongoInit.js');
const Generate = require('../fakeDataGen.js');
const uri = 'mongodb://localhost/SDC';

Generate.createProductsCSV('mongo')
  .then(response => {
    console.log('\n', response);
    /*let command = 'mongoimport mongodb://localhost/ -d SDC -c products --type csv --headerline --file mongo.csv';
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      console.log('STDOUT ', stdout);
      console.log('STDERR', stderr);
    }); */
  });

//mongoimport -d SDC -c products --type csv --headerline --file mongo.csv



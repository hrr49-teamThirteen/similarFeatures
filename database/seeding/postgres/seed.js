const Fake = require('./seedHelpers.js');

console.log('Seeding fake data...');

Fake.fillTypes(200)
  .then(() => {
    return Fake.fillCategories(200);
  })
  .then(() => {
    Fake.fillProducts('postgres');
  })
  .catch(err => {
    console.log(err);
  });


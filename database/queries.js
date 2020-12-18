const PTypeQuery = `SELECT p.id, p.name, price, image, featured, visited, t.name
FROM products as p LEFT OUTER JOIN types as t ON p.type_id = t.id
WHERE p.id > 9997500 AND p.type_id = $1;`;

const CategoryQuery = `SELECT p.id, p.name, price, image, featured, visited, c.name
FROM products as p LEFT OUTER JOIN categories as c ON p.category_id = c.id
WHERE p.id > 9997500 AND p.category_id = $1;`;

const FeaturedQuery = `SELECT p.id, p.name, price, image, featured, visited, c.name
FROM products as p LEFT OUTER JOIN categories as c ON p.category_id = c.id
WHERE p.id > 9997500 AND p.category_id = $1 AND featured = true;`;

const create = `INSERT INTO products (id, name, price, image, featured, visited, category_id, type_id) VALUES
(nextval('products_id_seq'), $1, $2, $3, $4, $5, $6, $7);`;

const update = (field) => {
  return `UPDATE products SET ${field} = $1 WHERE id = $2;`;
};

const remove = 'DELETE FROM products WHERE id = $1;';

module.exports = {
  PTypeQuery,
  CategoryQuery,
  FeaturedQuery,
  create,
  update,
  remove
};
EXPLAIN ANALYZE SELECT type_id FROM products WHERE id = 9000000;

EXPLAIN ANALYZE SELECT (p.name, price, image, featured, visited, t.name)
FROM products as p LEFT OUTER JOIN types as t ON p.type_id = t.id
WHERE p.id > 9990000 AND p.type_id = 19;

EXPLAIN ANALYZE SELECT category_id FROM products WHERE id = 9000000;

EXPLAIN ANALYZE SELECT (p.name, price, image, featured, visited, c.name)
FROM products as p LEFT OUTER JOIN categories as c ON p.category_id = c.id
WHERE p.id > 9990000 AND p.category_id = 19;


BEGIN;
EXPLAIN ANALYZE INSERT INTO products (id, name, price, image, featured, visited, category_id, type_id)
VALUES (10000001, 'falcon9', 10000.00, 'https://loremflickr.com/320/240/rocket', true, false, 14, 9);

EXPLAIN ANALYZE UPDATE products SET visited = true WHERE id = 9000000;

EXPLAIN ANALYZE DELETE FROM products where id = 9000000;
ROLLBACK;
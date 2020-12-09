\c sdc

BEGIN;
COPY products (id, name, price, image, featured, visited, type_id, category_id)
FROM '/home/gvsalinas/SDC/SimilarFeaturedCarousel/database/seeding/products.csv'
DELIMITER ',' CSV HEADER;

SELECT setval('products_id_seq', max(id)) FROM products;


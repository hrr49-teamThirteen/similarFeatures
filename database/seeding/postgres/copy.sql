\c sdc

COPY products (id, name, price, "imageUrl", featured, "typeId", "categoryId")
FROM '/home/gvsalinas/SDC/SimilarFeaturedCarousel/database/seeding/postgres/postgres.csv'
DELIMITER ',' CSV HEADER;
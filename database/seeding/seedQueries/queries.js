const categoryTable = `
  CREATE TABLE Categories (
    id serial PRIMARY KEY,
    name varchar(50) UNIQUE NOT NULL
  );
`;

const typesTable = `
  CREATE TABLE Types (
    id serial PRIMARY KEY,
    name varchar(50) UNIQUE NOT NULL
  );
`;

const productsTable = `
  CREATE TABLE Products (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL,
    price numeric(7,2) CHECK (price > 0) NOT NULL,
    image varchar(255) NOT NULL,
    featured boolean NOT NULL,
    visited boolean NOT NULL,
    category_id serial REFERENCES Categories (id),
    type_id serial REFERENCES Types (id)
  );
`;

module.exports = {
  categoryTable,
  typesTable,
  productsTable,
  sequence,
};
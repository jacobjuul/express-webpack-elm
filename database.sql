DROP DATABASE IF EXISTS smusmy;
CREATE DATABASE smusmy;

\c smusmy;

CREATE TABLE products (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  brand VARCHAR,
  price DECIMAL
);

INSERT INTO products (title, brand, price)
  VALUES ('Sneakers', 'Nike', '500');
/* Replace with your SQL commands */
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_price integer NOT NULL,
    product_category bigint REFERENCES categorys(id)
);
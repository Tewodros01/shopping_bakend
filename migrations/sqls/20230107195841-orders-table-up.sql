/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(100),
    user_id bigint REFERENCES users(id)
);
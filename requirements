# API Requirements
## DATABASE SCHEMA

### Users table 
- CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    password_digest VARCHAR(100)
);

### Product table 
- CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price float(2));

### Orders table 
- CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    status VARCHAR(25), 
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );

### Order Product table 
- CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL
    );

## ENDPOINTS

### User endpoints

/users (GET) index
/users/show/:id (GET) show
/users/create (POST) create
/users/auth (GET) authenticateUser
/users/delete (DELETE) delete


### Products endpoints

/products (GET) index
/products/show/:id (GET) show
/products/create (POST) create

Orders endpoints

/orders (GET) index
/orders/ceate/ (GET) index
/orders/show/:id (GET) show
/orders/user/:id (POST) getUserOrders

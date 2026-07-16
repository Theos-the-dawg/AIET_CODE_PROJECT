const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function execute(sql, params = []) {
  return pool.execute(sql, params);
}

async function initializeDatabase() {
  const connection = await pool.getConnection();

  try {
    console.log('Successfully connected to the MySQL database.');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_number VARCHAR(50) NOT NULL UNIQUE,
        order_id INT NOT NULL,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'Paid',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_invoices_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        CONSTRAINT fk_invoices_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_invoices_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
      )
    `);

    const [existingProducts] = await connection.query('SELECT COUNT(*) AS count FROM products');
    if (existingProducts.count === 0) {
      await connection.query(`
        INSERT INTO products (name, price, stock, description) VALUES
        ('Wireless Headphones', 99.99, 15, 'Noise-cancelling Bluetooth headphones'),
        ('Smartwatch', 149.50, 8, 'Water-resistant smartwatch with fitness tracking')
      `);
    }

    console.log('Relational tables checked and seeded successfully.');
  } finally {
    connection.release();
  }
}

module.exports = { pool, query, execute, initializeDatabase };
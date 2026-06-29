const mysql = require('mysql2/promise'); // Using promise-based version for async/await
require('dotenv').config();

// Create the connection pool using environmental variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the remote database!');
        
        
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS assignment_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        await connection.query(createTableQuery);
        console.log('Relational tables checked/created successfully.');
        
        connection.release(); // Always release the connection back to the pool
    } catch (error) {
        console.error('Database initialization failed:', error.message);
    }
}

initializeDatabase();

module.exports = pool;
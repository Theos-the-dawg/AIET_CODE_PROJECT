const { query, execute } = require('./db');

function mapProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    stock: Number(row.stock),
    description: row.description,
    createdAt: row.created_at || row.createdAt
  };
}

async function findAll() {
  const rows = await query('SELECT id, name, price, stock, description, created_at AS createdAt FROM products ORDER BY id DESC');
  return rows.map(mapProduct);
}

async function findById(id) {
  const rows = await query('SELECT id, name, price, stock, description, created_at AS createdAt FROM products WHERE id = ?', [Number(id)]);
  return rows[0] ? mapProduct(rows[0]) : null;
}

async function decrementStock(id, quantity) {
  await execute('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, Number(id)]);
}

async function create(productData) {
  const { name, price, stock, description } = productData;
  const [result] = await execute(
    'INSERT INTO products (name, price, stock, description) VALUES (?, ?, ?, ?)',
    [name, price, stock, description]
  );

  return {
    id: result.insertId,
    name,
    price,
    stock,
    description,
    createdAt: new Date()
  };
}

module.exports = {
  findAll,
  findById,
  decrementStock,
  create
};
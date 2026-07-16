const { query, execute } = require('./db');

function mapOrder(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    productId: row.product_id,
    quantity: Number(row.quantity),
    totalPrice: Number(row.total_price),
    createdAt: row.created_at || row.createdAt,
    product: row.product_name ? {
      id: row.product_id,
      name: row.product_name,
      price: Number(row.product_price),
      description: row.product_description
    } : null
  };
}

async function create(orderData) {
  const { userId, productId, quantity, totalPrice } = orderData;
  const [result] = await execute(
    'INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)',
    [userId, productId, quantity, totalPrice]
  );

  return {
    id: result.insertId,
    userId,
    productId,
    quantity,
    totalPrice,
    createdAt: new Date()
  };
}

async function findByUser(userId) {
  const rows = await query(`
    SELECT o.id, o.user_id, o.product_id, o.quantity, o.total_price, o.created_at,
           p.name AS product_name, p.price AS product_price, p.description AS product_description
    FROM orders o
    LEFT JOIN products p ON p.id = o.product_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `, [Number(userId)]);

  return rows.map(mapOrder);
}

module.exports = {
  create,
  findByUser
};
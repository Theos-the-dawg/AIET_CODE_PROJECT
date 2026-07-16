const { query, execute } = require('./db');

function mapInvoice(row) {
  if (!row) return null;
  return {
    id: row.id,
    invoiceNumber: row.invoice_number,
    orderId: row.order_id,
    userId: row.user_id,
    productId: row.product_id,
    quantity: Number(row.quantity),
    totalPrice: Number(row.total_price),
    status: row.status,
    createdAt: row.created_at || row.createdAt,
    product: row.product_name ? {
      id: row.product_id,
      name: row.product_name,
      price: Number(row.product_price),
      description: row.product_description
    } : null,
    user: row.username ? {
      id: row.user_id,
      username: row.username,
      email: row.email
    } : null
  };
}

async function create(invoiceData) {
  const { invoiceNumber, orderId, userId, productId, quantity, totalPrice, status } = invoiceData;
  const [result] = await execute(
    'INSERT INTO invoices (invoice_number, order_id, user_id, product_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [invoiceNumber, orderId, userId, productId, quantity, totalPrice, status || 'Paid']
  );

  return {
    id: result.insertId,
    invoiceNumber,
    orderId,
    userId,
    productId,
    quantity,
    totalPrice,
    status: status || 'Paid',
    createdAt: new Date()
  };
}

async function findByUser(userId) {
  const rows = await query(`
    SELECT i.id, i.invoice_number, i.order_id, i.user_id, i.product_id, i.quantity, i.total_price, i.status, i.created_at,
           p.name AS product_name, p.price AS product_price, p.description AS product_description,
           u.username, u.email
    FROM invoices i
    LEFT JOIN products p ON p.id = i.product_id
    LEFT JOIN users u ON u.id = i.user_id
    WHERE i.user_id = ?
    ORDER BY i.created_at DESC
  `, [Number(userId)]);

  return rows.map(mapInvoice);
}

module.exports = {
  create,
  findByUser
};
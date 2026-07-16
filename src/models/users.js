const { query, execute } = require('./db');

function mapUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    password: row.password,
    regDate: row.reg_date || row.regDate
  };
}

async function findAll() {
  const rows = await query('SELECT id, username, email, password, reg_date AS regDate FROM users ORDER BY id DESC');
  return rows.map(mapUser);
}

async function findById(id) {
  const rows = await query('SELECT id, username, email, password, reg_date AS regDate FROM users WHERE id = ?', [Number(id)]);
  return rows[0] ? mapUser(rows[0]) : null;
}

async function findByUsernameOrEmail(username, email) {
  const rows = await query(
    'SELECT id, username, email, password, reg_date AS regDate FROM users WHERE username = ? OR email = ? LIMIT 1',
    [username, email]
  );
  return rows[0] ? mapUser(rows[0]) : null;
}

async function findByEmailOrUsername(email, username) {
  const rows = await query(
    'SELECT id, username, email, password, reg_date AS regDate FROM users WHERE email = ? OR username = ? LIMIT 1',
    [email, username]
  );
  return rows[0] ? mapUser(rows[0]) : null;
}

async function create(userData) {
  const { username, email, password } = userData;
  const [result] = await execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );

  return {
    id: result.insertId,
    username,
    email,
    password,
    regDate: new Date()
  };
}

module.exports = {
  findAll,
  findById,
  findByUsernameOrEmail,
  findByEmailOrUsername,
  create
};

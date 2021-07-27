const table = 'user_1';

module.exports = {
  createUsers: `INSERT INTO ${table}(user_name, user_email ,user_direction, user_password) VALUES ($1, $2, $3, $4) 
    RETURNING user_id`,

  createRole: `INSERT INTO ${table} (user_isAdmin) VALUES ($1)`,

  getAllUsers: `SELECT * FROM ${table}`,

  getUserById: `SELECT * FROM ${table}  WHERE user_id = $1`,

  getUserByEmail: `SELECT * FROM ${table} WHERE user_email = $1`,

  getUsersByEmailAndPassword: `SELECT * FROM ${table}  WHERE user_email = $1 AND user_password = $2`,

  updateRoleById: `UPDATE ${table} SET user_isAdmin = $1 WHERE user_id = $2`,

  deleteUserById: `DELETE FROM ${table} WHERE user_id = $1`,

  deleteRoleById: `DELETE FROM ${table} WHERE user_id = $1`,
};

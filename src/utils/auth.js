const Pool = require('pg').Pool;
const dbConfig = require('../config/db');
const dbQueriesRole = require('../config/queries/user');

const pool = new Pool(dbConfig);

const AuthAdmin = async (userId) => {
  const data = await pool.query(dbQueriesRole.getUserById, [userId]);

  if (data) {
    if (data.rows[0].role_des == 'Admin') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = {
  AuthAdmin,
};

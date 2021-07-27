const table = 'establishment';

module.exports = {
  createEstablishment: `INSERT INTO ${table} (establishment_name, establishment_direction) VALUES ($1, $2,3$) 
    RETURNING product_ide`,

  getAllEstablishment: `SELECT * FROM ${table}`,

  getEstablishmentById: `SELECT * FROM ${table} WHERE establishment_id = $1`,

  getEstablishmentByName: `SELECT * FROM ${table} WHERE establishment_name = $1`,

  updateEstablishmentNameById: `UPDATE ${table} SET establishment_name = $1 WHERE  establishment_id = $2`,

  updateEstablishmentById: `UPDATE ${table} SET establishment_name = $1, establishment_direction = $2 WHERE establishment_id = $3`,

  deleteEstablishmentById: `DELETE FROM ${table} WHERE establishment_id = $1`,
};

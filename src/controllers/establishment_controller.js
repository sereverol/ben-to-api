const Pool = require('pg').Pool;
const dbConfig = require('../config/db');
const dbQueriesEstablishment = require('../config/queries/establishment');
const field = require('../utils/field');
// const auth = require('../utils/auth')

const pool = new Pool(dbConfig);

const newReponse = (message, typeResponse, body) => {
  return { message, typeResponse, body };
};

const dataToEstablishment = (rows) => {
  const Establishment = [];

  rows.forEach((element) => {
    Establishment.push({
      id: element.establishment_id,
      name: element.establishment_name,
      direction: element.establishment_direction,
      description: element.establishment_description,
      budget: element.establishment_budget,
      imageurl: element.establishment_imageurl,
    });
  });

  return Establishment;
};

// const getEstablishment = async (req, res) => {
//   const data = await pool.query(dbQueriesMenu.getMenusWithoutParentId);

//   if (data) {
//     data.rowCount > 0
//       ? res.json(
//           newReponse(
//             'All Establishment',
//             'Success',
//             dataToEstablishment(data.rows)
//           )
//         )
//       : res.json(newReponse('Error searhing the establishment', 'Error', {}));
//   } else {
//     res.json(newReponse('Without Establishment', 'Success', {}));
//   }
// };

const getEstablishment = async (req, res) => {
  // res.send('so loud');
  const data = await pool.query(dbQueriesEstablishment.getEstablishment);

  if (data) {
    data.rowCount > 0
      ? res.json(
          newReponse(
            'Establishments found',
            'Success',
            dataToEstablishment(data.rows)
          )
        )
      : res.json(newReponse('Establishmen not found', 'Error', {}));
  } else {
    res.json(newReponse('Error searching Establishmen with id', 'Error', {}));
  }
};

const createEstablishment = async (req, res) => {
  const { name, direction, description, budget, imageurl } = req.body;
  const errors = [];

  if (!field.checkFields([name, direction])) {
    errors.push({ text: 'Empty fields' });
  }

  if (errors.length > 0) {
    res.json(newReponse('Errors detected', 'Fail', { errors }));
  } else {
    const data = await pool.query(dbQueriesEstablishment.createEstablishment, [
      name,
      direction,
      description,
      budget,
      imageurl,
    ]);

    data
      ? res.json(
          newReponse('Establishment created successfully', 'Success', {
            id: data.rows[0],
          })
        )
      : res.json(newReponse('Error create Establishment', 'Error', {}));
  }
};

const updateEstablishmentById = async (req, res) => {
  const { direction, name, id, type } = req.body;
  const errors = [];

  if (!field.checkFields([price, id, type, check])) {
    errors.push({ text: 'Empty fields' });
  }

  if (errors.length > 0) {
    res.json(newReponse('Errors detected', 'Fail', { errors }));
  } else {
    let data;

    switch (type) {
      case 'name':
        data = await pool.query(
          dbQueriesEstablishment.updateEstablishmentNameById,
          [name, id]
        );
        break;

      default:
        data = await pool.query(
          dbQueriesEstablishment.updateEstablishmentById,
          [direction, name, id]
        );
        break;
    }

    data
      ? res.json(
          newReponse('Establishment updated successfully', 'Success', {})
        )
      : res.json(newReponse('Error update Establishment', 'Error', {}));
  }
};

const deleteEstablishmentById = async (req, res) => {
  const { establishmentId } = req.params;
  const data = await pool.query(
    dbQueriesEstablishment.deleteEstablishmentById,
    [establishmentId]
  );

  data
    ? res.json(newReponse('Establishment deleted successfully', 'Success', {}))
    : res.json(newReponse('Error on delete with id', 'Error', {}));
};

module.exports = {
  createEstablishment,
  getEstablishment,
  // getEstablishmentById,
  updateEstablishmentById,
  deleteEstablishmentById,
};

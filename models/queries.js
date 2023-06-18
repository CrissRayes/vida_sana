const pool = require('./db');

const queryEvents = async () => {
  const sqlQuery = 'SELECT * FROM eventos';
  const { rows: eventos } = await pool.query(sqlQuery);
  return eventos;
};

module.exports = {
  queryEvents,
};

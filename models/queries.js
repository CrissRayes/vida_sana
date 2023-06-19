const bcrypt = require('bcryptjs');
const pool = require('./db');

const allEvents = async () => {
  const sqlQuery = 'SELECT * FROM eventos';
  const { rows: eventos } = await pool.query(sqlQuery);
  return eventos;
};

const validateCredentials = async (email, password) => {
  // email y contraseña ingresados?
  if (!email) {
    throw new Error('Email no ingresado');
  }
  if (!password) {
    throw new Error('Contraseña no ingresada');
  }

  // Obtener data
  const sqlQuery = 'SELECT * FROM usuarios WHERE email = $1';
  const values = [email];
  const { rows } = await pool.query(sqlQuery, values);
  const user = rows[0];

  // existe el usuario?
  if (!rows.length === 0) {
    throw new Error('El usuario no existe');
  }

  // coinciden las contraseñas?
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    throw new Error('Contraseña incorrecta');
  }
};

// verificar si email no existe para poder crearlo
const checkEmail = async (email) => {
  const sqlQuery = 'SELECT * FROM usuarios WHERE email = $1';
  const values = [email];

  const { rows } = await pool.query(sqlQuery, values);
  return rows.length > 0;
};
// crear usuario
const createUser = async (user) => {
  const { email, password } = user;
  const hashedPassword = bcrypt.hashSync(password);
  const values = [email, hashedPassword];
  const sqlQuery = 'INSERT INTO usuarios values (DEFAULT, $1, $2)';

  await pool.query(sqlQuery, values);
};

module.exports = {
  allEvents,
  validateCredentials,
  checkEmail,
  createUser,
};

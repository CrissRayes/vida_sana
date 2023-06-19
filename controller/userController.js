const jwt = require('jsonwebtoken');
const { queryEvents, validateCredentials } = require('../models/queries');

const getAllEvents = async (req, res, next) => {
  const events = await queryEvents();
  res.json(events);
};

const loginUser = async (req, res, next) => {
  try {
    // obtener email y pass del body de la request
    const { email, password } = req.body;
    // verificar si las credenciales son correctas
    await validateCredentials(email, password);
    // generar un token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    // enviar respuesta con el token
    res.status(200).json(token);
  } catch (error) {
    error.status = 'fail';
    error.statusCode = 500;
    return next(error);
  }
};

module.exports = {
  getAllEvents,
  loginUser,
};

const jwt = require('jsonwebtoken');
const {
  allEvents,
  validateCredentials,
  checkEmail,
  createUser,
} = require('../models/queries');

// Custom middlewares

// verificar que el payload tenga email y password
const checkPayload = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error('Faltan campos');
    error.status = 'fail';
    error.statusCode = 400;
    return next(error);
  }
  next();
};

// verificar token
// para dar acceso a editar, borrar, ver info restringida
const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new Error('Acceso no autorizado');
    error.status = 'fail';
    error.statusCode = 401;
    return next(error);
  }
};

// Route handlers
const getAllEvents = async (req, res, next) => {
  const events = await allEvents();
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

const newUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExists = await checkEmail(email);
    if (emailExists) {
      const error = new Error('El email ya existe');
      error.status = 'fail';
      error.statusCode = 400;
      return next(error);
    }
    await createUser(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Usuario creado exitósamente',
    });
  } catch (error) {
    error.status = 'fail';
    error.statusCode = 500;
    return next(error);
  }
};

module.exports = {
  getAllEvents,
  loginUser,
  checkPayload,
  authenticateToken,
  newUser,
};

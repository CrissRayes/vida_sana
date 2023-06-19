const express = require('express');
const {
  getAllEvents,
  loginUser,
  checkPayload,
  newUser,
} = require('../controller/userController');

const router = express.Router();

router.route('/eventos').get(getAllEvents);
router.route('/crearUsuario').post(checkPayload, newUser);
router.route('/login').post(loginUser);

module.exports = router;

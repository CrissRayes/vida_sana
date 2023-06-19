const express = require('express');
const {
  getAllEvents,
  loginUser,
  checkUserPayload,
  newUser,
  authenticateToken,
  editEvent,
} = require('../controller/userController');

const router = express.Router();

router.route('/eventos').get(getAllEvents);
router.route('/crearUsuario').post(checkUserPayload, newUser);
router.route('/login').post(loginUser);
router.route('/eventos/:id').put(authenticateToken, editEvent);

module.exports = router;

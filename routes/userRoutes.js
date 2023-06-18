const express = require('express');
const { getAllEvents } = require('../controller/userController');

const router = express.Router();

router.route('/eventos').get(getAllEvents);

module.exports = router;

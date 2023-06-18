const { queryEvents } = require('../models/queries');

const getAllEvents = async (req, res, next) => {
  const events = await queryEvents();
  res.json(events);
};

module.exports = {
  getAllEvents,
};

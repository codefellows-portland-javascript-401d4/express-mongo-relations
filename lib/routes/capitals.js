const express = require('express');
const router = express.Router();
const Ship = require('../models/ship');
const shipSizer = require('../ship-sizer');

router
  .get('/', (req, res, next) => {
    Ship.find({lengthMeters: {$gte: 100}})
      .then(ships => {
        const allShips = ships;
        const lengths = ships.map(ship => ship.lengthMeters);
        const avg = lengths.reduce((acc, curr) => acc + curr, 0) / lengths.length;
        res.send({averageLengthMeters, ships});
      })
      .catch(next);
  });

module.exports = router;
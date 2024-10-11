const express = require("express");
const route = express.Router();
const getbalance = require('../Controller/Account/Balance')

route.route('/balance/:address').get(getbalance);

module.exports = route;
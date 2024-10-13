const express = require("express");
const route = express.Router();
const getbalance = require('../Controller/Account/Balance')
const {getUser,getWallet} = require('../Controller/Account/User')

route.route('/balance/:address').get(getbalance);
route.route('/wallet/:id').get(getWallet);

module.exports = route;
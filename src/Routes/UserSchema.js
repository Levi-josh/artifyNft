const express = require("express");
const route = express.Router();
const getUser = require('../Controller/Account/User')

route.route('/user/:id').get(getUser);

module.exports = route;
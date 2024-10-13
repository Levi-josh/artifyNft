const express = require("express");
const route = express.Router();
const {getUser,getWallet}= require('../Controller/Account/User')

route.route('/user/:id').get(getUser);

module.exports = route;
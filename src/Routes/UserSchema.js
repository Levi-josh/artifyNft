const express = require("express");
const route = express.Router();
const {getUser,getWallet,getMessages}= require('../Controller/Account/User')

route.route('/user/:id').get(getUser);
route.route("/getmessages/:id").get(getMessages);

module.exports = route;
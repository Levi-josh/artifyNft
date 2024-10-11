const express = require("express");
const route = express.Router();
const {login,logout,signup} = require("../Controller/Auth/Jwt")

route.route("/signUp").post(signup);
route.route("/signIn").post(login);
route.route("/logout").get(logout);


module.exports = route;
const express = require("express");
const route = express.Router();

const {getLatestCol,getTrendingCol,getMyNfts,getMyCollection} = require('../Controller/Collections/artController')

route.route("/latest").get(getLatestCol);
route.route("/trending").get(getTrendingCol);
route.route("/myNfts").get(getMyNfts);
route.route("/myCols").get(getMyCollection);


module.exports = route;
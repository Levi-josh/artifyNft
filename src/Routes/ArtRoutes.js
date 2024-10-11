const express = require("express");
const route = express.Router();

const {getLatestCol,getTrendingCol,getMyNfts,getMyCollection,getTrendNft,getLatestNft} = require('../Controller/Collections/artController')

route.route("/latest").get(getLatestCol);
route.route("/trending").get(getTrendingCol);
route.route("/myNfts/:id").get(getMyNfts);
route.route("/myCols/:id").get(getMyCollection);
route.route("/trendNfts/:id").get(getTrendNft);
route.route("/latestNfts/:id").get(getLatestNft);


module.exports = route;
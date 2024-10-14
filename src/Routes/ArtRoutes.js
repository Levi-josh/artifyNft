const express = require("express");
const route = express.Router();

const {getLatestCol,getTrendingCol,getMyNfts,getMyCollection,getTrendNft,getLatestNft,getPhotoNft,getPopNft,getPopCol,getPhotoCol} = require('../Controller/Collections/artController')

route.route("/latest").get(getLatestCol);
route.route("/trending").get(getTrendingCol);
route.route("/myNfts/:id").get(getMyNfts);
route.route("/myCols/:id").get(getMyCollection);
route.route("/trendNfts/:id").get(getTrendNft);
route.route("/getPhotoNft/:id").get(getPhotoNft);
route.route("/getPopNft/:id").get(getPopNft);
route.route("/latestNfts/:id").get(getLatestNft);
route.route("/getPopCol").get(getPopCol);
route.route("/getPhotoCol").get(getPhotoCol);

module.exports = route;
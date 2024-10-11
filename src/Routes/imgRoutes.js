const express = require("express");
const route = express.Router();
const upload = require('../Utils/Multer')
const {postNfts,postCollectionPfp,postTrendingNfts,postTrendingCols,postLatestCols,postLatestNfts} = require("../Controller/Collections/imgController")

route.route("/postCol").post(upload.single('image'),postCollectionPfp);
route.route("/postNft").post(upload.single('image'),postNfts);
route.route("/postTrendNft").post(upload.single('image'),postTrendingNfts);
route.route("/postTrendCol").post(upload.single('image'),postTrendingCols);
route.route("/postLatestCol").post(upload.single('image'),postLatestCols);
route.route("/postLatestNft").post(upload.single('image'),postLatestNfts);


module.exports = route;
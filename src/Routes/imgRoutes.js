const express = require("express");
const route = express.Router();
const upload = require('../Utils/Multer')
const {postNfts,postCollectionPfp,postTrendingNfts,postTrendingCols,postLatestCols,postLatestNfts,postPopCols,postPhotoCols,postPopNfts,postPhotoNfts} = require("../Controller/Collections/imgController")

route.route("/postCol").post(upload.single('image'),postCollectionPfp);
route.route("/postNft").post(upload.single('image'),postNfts);
route.route("/postTrendNft").post(upload.single('image'),postTrendingNfts);
route.route("/postTrendCol").post(upload.single('image'),postTrendingCols);
route.route("/postLatestCol").post(upload.single('image'),postLatestCols);
route.route("/postLatestNft").post(upload.single('image'),postLatestNfts);
route.route("/postPopCol").post(upload.single('image'),postPopCols);
route.route("/postPhotoCol").post(upload.single('image'),postPhotoCols);
route.route("/postPopNft").post(upload.single('image'),postPopNfts);
route.route("/postPhotoNft").post(upload.single('image'),postPhotoNfts);


module.exports = route;
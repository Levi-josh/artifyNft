const mongoose = require('mongoose');
const schema = mongoose.Schema;

const myNfts = new mongoose.Schema({
price:Number,
nftImage:String,
itemName:String,
approved:Boolean
})

const collections = new mongoose.Schema({
artiste:String,
profilePic:String,
price:Number,
nfts:[myNfts],
itemName:String,
description:String,
approved:Boolean
})
module.exports = mongoose.model('TrendingCols', collections)
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const collections = new mongoose.Schema({
artiste:String,
price:String,
nftImage:String,
itemName:String,
note:String
})
module.exports = mongoose.model('NftCollections', collections)
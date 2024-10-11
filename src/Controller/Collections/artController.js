const users = require('../../Models/UserSchema')
const latestCols = require('../../Models/LatestSchema')
const trendingCols = require('../../Models/TrendSchema')

const getMyCollection = async (req,res,next) => {
try {
const user = await users.findById(req.params.id)
const myCollection = user.collections
res.status(200).json(myCollection) 
} catch (err) {
 next(err)   
}
}
const getMyNfts = async (req,res,next) => {
try {
const user = await users.findById(req.params.id)
const mycols = user.collections.find(prev=>prev._id == req.params.id)
const myNfts = mycols.nfts
res.status(200).json(myNfts)    
} catch (err) {
 next(err)   
}
}
const getTrendingCol = async (req,res,next) => {
try {
const nftCollections = await trendingCols.find()   
res.status(200).json(nftCollections)   
} catch (err) {
 next(err)   
}
}
const getLatestCol = async (req,res,next) => {
try {
const nftCollections = await latestCols.find()   
res.status(200).json(nftCollections)    
} catch (err) {
 next(err)   
}
}

module.exports = {getLatestCol,getTrendingCol,getMyNfts,getMyCollection}
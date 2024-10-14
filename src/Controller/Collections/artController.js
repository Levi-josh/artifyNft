const users = require('../../Models/UserSchema')
const latestCols = require('../../Models/LatestSchema')
const trendingCols = require('../../Models/TrendSchema')
const photoCol = require('../../Models/PhotoSchema')
const popCol = require('../../Models/PopSchema')
const { ObjectId } = require('mongodb')

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
    const colIdObjectId = new ObjectId(req.params.id)
    const user = await users.findOne({'collections._id':colIdObjectId})
    if(!user){
        throw new Error('no user found')
    }else{
        const collection = user.collections.find(prev => prev._id.toString() == colIdObjectId.toString())
        res.status(200).json(collection)  
    }  
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
const getPhotoCol = async (req,res,next) => {
try {
const nftCollections = await photoCol.find()   
res.status(200).json(nftCollections)    
} catch (err) {
 next(err)   
}
}
const getPopCol = async (req,res,next) => {
try {
const nftCollections = await popCol.find()   
res.status(200).json(nftCollections)    
} catch (err) {
 next(err)   
}
}
const getLatestNft = async (req,res,next) => {
try {
const nftCollections = await latestCols.findById(req.params.id)   
res.status(200).json(nftCollections)    
} catch (err) {
 next(err)   
}
}
const getTrendNft = async (req,res,next) => {
try {
const nftCollections = await trendingCols.findById(req.params.id)   
res.status(200).json(nftCollections)    
} catch (err) {
 next(err)   
}
}
const getPopNft = async (req,res,next) => {
try {
const nftCollections = await popCol.findById(req.params.id)   
res.status(200).json(nftCollections)    
} catch (err) {
 next(err)   
}
}
const getPhotoNft = async (req,res,next) => {
try {
const nftCollections = await photoCol.findById(req.params.id)   
res.status(200).json(nftCollections)    
} catch (err) {
 next(err)   
}
}

module.exports = {getLatestCol,getTrendingCol,getMyNfts,getMyCollection,getTrendNft,getLatestNft,getPhotoNft,getPopNft,getPopCol,getPhotoCol}
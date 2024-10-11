const users = require('../../Models/UserSchema')
const collections = require('../../Models/NftSchema')

const mintNft = async (req,res,next) => {
try {
const {id} = req.params
const user = await users.findOne({'collections._id':id})
if (user.balance<0) {
  await users.updateOne({'collections._id':id}, {$push:{myNfts: unapproved}} )
  throw new Error('you must have a gas fee of 0.2 eth to mint these nfts')   
}
else{
const myCollections = user.collections.filter(prev=>prev._id == id)  
const unapproved = myCollections[0].collections.filter(prev=>prev.approved==false) 
for (let item of unapproved) {
    const approve = {
      $set: {
        'collections.$[elem].collections.$.approved':!item.approved
      },
    };
    const elemId = {
     arrayFilters: [{ "elem._id": id }] 
    }
    await users.updateOne({'collections._id':id}, approve , elemId);
}
await collections.create(myCollections[0]) // adds the collection to landing page
await users.updateOne({_id:user._id}, {$push:{myNfts: unapproved}} );//post to mynfts
res.status(200).json({message:'You have sucessfully mint your nfts,Try minting more for visibility.'})
}}
catch (err) {
next(err)    
}
}
const approvedNfts = async (req,res,next) => {
try {
  const {id} = req.params
  const user = await users.findOne({'collections._id':id})
  const myCollections = user.collections.filter(prev=>prev._id == id)
  const approved = myCollections[0].collections.filter(prev=>prev.approved==true) 
  res.status(200).json({message:approved})
} catch (err) {
  next(err)   
}
}
const unApprovedNfts = async (req,res,next) => {
try {
  const {id} = req.params
  const user = await users.findOne({'collections._id':id})
  const myCollections = user.collections.filter(prev=>prev._id == id)
  const unapproved = myCollections[0].collections.filter(prev=>prev.approved==false) 
  res.status(200).json({message:unapproved})  
} catch (err) {
 next(err)   
}
}

module.exports = {mintNft,unApprovedNfts,approvedNfts };
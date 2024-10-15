const users = require('../../Models/UserSchema')

const getUser = async(req,res,next)=>{
try {
    const user = await users.findOne({_id:req.params.id})
    res.status(200).json(user) 
    } catch (err) {
     next(err)   
    }
}
const getWallet = async(req,res,next)=>{
try {
    const user = await users.findOne({_id:req.params.id})
    res.status(200).json({walletadd:user.walletId}) 
    } catch (err) {
     next(err)   
    }
}
const getMessages = async(req,res,next)=>{
try {
    const user = await users.findOne({_id:req.params.id1})
    const adminMsg = user.admin&&user.adminchats.find(prev=> prev.userId == req.params.id2)
    const msg = user.admin?adminMsg.messages:user.clientChats.messages
    res.status(200).json(msg) 
    } catch (err) {
     next(err)   
    }
}
module.exports = {getUser,getWallet,getMessages}
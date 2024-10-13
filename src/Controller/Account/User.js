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
module.exports = {getUser,getWallet}
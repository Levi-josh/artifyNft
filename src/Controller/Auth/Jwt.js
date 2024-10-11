const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('../../Models/UserSchema')
const Wallets = require('../../Models/WalletSchema')

const signup = async (req, res, next) => {
    try {
        // const wallets = await Wallets.find()
        // const userWallet = wallets[0]
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)
        const date = new Date()
        const newtime = date.toLocaleTimeString()
        const mynewusers = await users.create({
            'username': req.body.username,
            'email': req.body.email,
            'password': hash,
            'socketId':'',
            'adminchats':[],
            'clientChats':{},
            'balance':0,
            'walletId':'',
            'notification':[],
            'collections':[],
            'admin':false
        })
        // await users.deleteOne({_id:userWallet._id})
        const token = jwt.sign({ _id: mynewusers._id }, process.env.Access_Token, { expiresIn: '1d' })
        res.status(200).json({'Accesss_Token':token,'UserId':mynewusers._id})

    } catch (err) {
        next(err)
    }
}
const login = async (req, res, next) => {
    try {
        const myusers = await users.findOne({
            email: req.body.email
        })
        if (myusers) {
            const hash = await bcrypt.compare(req.body.password, myusers.password)
            if (hash) {
            const token = jwt.sign({ _id: myusers._id }, process.env.Access_Token,{ expiresIn: '1d' })
            res.status(200).json({'Accesss_Token':token,'UserId':myusers._id})
            } else {
            throw new Error('incorrect password')
            }
        } else {
        throw new Error('No user found')
        }
    } catch (err) {
    next(err)
    }
}
const logout = async (req, res, next) => {
    try {
    const newjwt = jwt.sign({ _id: req.body.id }, process.env.Access_Token, { expiresIn: '2s' })
    res.status(200).json(newjwt)    
    } catch (err) {
    next(err)
    }
}
module.exports = {login,logout,signup}
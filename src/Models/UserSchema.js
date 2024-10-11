const mongoose = require('mongoose');
const schema = mongoose.Schema;

const noteSchema = new mongoose.Schema({
    note:String,
    timestamp: { type: Date, default: Date.now }
});
const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});
const chatSchema = new mongoose.Schema({
    username:String,
    messages:[messageSchema],
    userId:String,
    socketId:String,
})

const myNfts = new mongoose.Schema({
    price:String,
    nftImage:String,
    itemName:String,
    approved:Boolean,
    description:String
    })
const nftCollections = new mongoose.Schema({
    artiste:String,
    profilePic:String,
    price:Number,
    nfts:[myNfts], 
    itemName:String,
    description:String,
    approved:Boolean
})
const newusers = new schema({
    email:{
        type: String,
        required: [true, 'Enter an email'],
        unique: true,
    },
    socketId:String,
    username: String,
    password: {
        type: String,
        required: [true, 'Enter a password'],  
    },
    balance:Number,
    adminchats:[chatSchema],
    clientChats:chatSchema,
    walletId:String,
    notification:[noteSchema],
    collections:[nftCollections],
    admin:Boolean
    })
    
    module.exports = mongoose.model('User', newusers)
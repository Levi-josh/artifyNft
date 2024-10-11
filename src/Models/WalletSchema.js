const mongoose = require('mongoose');
const schema = mongoose.Schema;

const newWallets = new schema({
wallet:String
})

module.exports = mongoose.model('Wallet', newWallets)
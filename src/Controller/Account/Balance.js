const { Web3 } = require('web3')

// Initialize Web3 instance directly with the Infura URL
const web3 = new Web3('https://mainnet.infura.io/v3/4ed6751f016349faa88d6c1a60806e76');

// Your users schema
const users = require('../../Models/UserSchema');

// Function to fetch balance and update user record
const getBalance = async (req, res,next) => {
    const address = req.params.address;
    try {
        if (!address) {
           throw new Error('Wallet address is required' )
        }
        const user = await users.findOne({ walletId: address })
        if(!user){
            throw new Error('no user with this address found');
        }
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEtherFromBlockchain = Web3.utils.fromWei(balanceWei, 'ether');
        const balanceEtherFromUser = Web3.utils.fromWei(user.balance, 'ether');
        const totalBalance = parseFloat(balanceEtherFromUser) + parseFloat(balanceEtherFromBlockchain);
        const newBalance = BigInt(balanceWei);
        const balance = BigInt(user.balance);
        const myBalance = balance+newBalance
        await users.updateOne({ walletId: address }, { $set: { balance:myBalance.toString()} });
        res.status(200).json({
            balance:totalBalance.toString()
        });
    } catch (error) {
        next(error)
    }
}

module.exports = getBalance;

const Web3 = require('web3');
const myweb3 = new Web3('https://mainnet.infura.io/v3/4ed6751f016349faa88d6c1a60806e76'); // Replace with your Ethereum node URL
const users = require('../../Models/UserSchema')

const getbalance = async (req, res) => {
    const address = req.params.address;
    try {
        const balance = await myweb3.eth.getBalance(address);
        const saved = await users.updateOne({walletId:address},{$set:{balance: myweb3.utils.fromWei(balance, 'ether')}})
        res.status(200).json({
            balance: myweb3.utils.fromWei(balance, 'ether') // Convert balance to ether
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
}

module.exports = getbalance 
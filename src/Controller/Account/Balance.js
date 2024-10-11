const Web3 = require('web3');
const web3 = new Web3('YOUR_ETHEREUM_NODE_URL'); // Replace with your Ethereum node URL
const users = require('../../Models/UserSchema')

const getbalance = async (req, res) => {
    const address = req.params.address;
    try {
        const balance = await web3.eth.getBalance(address);
        const saved = await users.updateOne({walletId:address},{$set:{balance: web3.utils.fromWei(balance, 'ether')}})
        res.json({
            balance: web3.utils.fromWei(balance, 'ether') // Convert balance to ether
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
}

module.exports = getbalance 
const Web3 = require('web3');

// Create HTTP provider with your Infura URL
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/4ed6751f016349faa88d6c1a60806e76');

// Initialize Web3 with the provider
const web3 = new Web3(provider);
const users = require('../../Models/UserSchema')

const getbalance = async (req, res) => {
    const address = req.params.address;
    try {
        const balanceWei = await web3.eth.getBalance(address);
        // const balanceEther = Eth.utils.fromWei(balanceWei, 'ether')
        const saved = await users.updateOne({walletId:address},{$set:{balance:balanceWei}})
        res.status(200).json({
            balanceWei 
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
}

module.exports = getbalance 
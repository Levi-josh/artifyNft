const { createWeb3HttpProvider, Eth } = require('web3');

// Create HTTP provider with your Infura URL
const provider = createWeb3HttpProvider('https://mainnet.infura.io/v3/4ed6751f016349faa88d6c1a60806e76');

// Initialize Eth instance for interacting with Ethereum
const eth = new Eth(provider); // Replace with your Ethereum node URL
const users = require('../../Models/UserSchema')

const getbalance = async (req, res) => {
    const address = req.params.address;
    try {
        const balanceWei = await eth.getBalance(address);
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
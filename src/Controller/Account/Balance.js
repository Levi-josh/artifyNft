const { Web3 } = require('web3')

// Initialize Web3 instance directly with the Infura URL
const web3 = new Web3('https://mainnet.infura.io/v3/4ed6751f016349faa88d6c1a60806e76');

// Your users schema
const users = require('../../Models/UserSchema');

// Function to fetch balance and update user record
const getBalance = async (req, res) => {
    const address = req.params.address;

    // Check if the address is provided
    if (!address) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }
    if (!web3.utils.isAddress(address)) {
        console.log('Invalid Ethereum address')
        return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    try {
        // Fetch balance from Ethereum network (in Wei)
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEther = Web3.utils.fromWei(balanceWei, 'ether'); 
        await users.updateOne({ walletId: address }, { $set: { balance: balanceWei } });
        res.status(200).json({
            balance: balanceEther, 
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
}

module.exports = getBalance;

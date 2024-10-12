const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/4ed6751f016349faa88d6c1a60806e76');

// Initialize Web3 with the provider
const web3 = new Web3(provider);

// Your users schema
const users = require('../../Models/UserSchema');

// Function to fetch balance and update user record
const getBalance = async (req, res) => {
    const address = req.params.address;

    // Check if the address is provided
    if (!address) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }

    try {
        // Fetch balance from Ethereum network (in Wei)
        const balanceWei = await web3.eth.getBalance(address);

        // Optionally, convert balance from Wei to Ether for easier display
        // const balanceEther = Web3.utils.fromWei(balanceWei, 'ether');  // Uncomment if you want balance in Ether
        
        // Update user's balance in the database
        await users.updateOne({ walletId: address }, { $set: { balance: balanceWei } });

        // Respond with the balance
        res.status(200).json({
            balance: balanceWei, // Or use balanceEther if you want Ether
        });

    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
}

module.exports = getBalance;

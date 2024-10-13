const mongoose = require('mongoose');
const users = require('../Models/UserSchema'); // Your user model
const ApprovedCollections = require('../Models/LatestSchema'); // The approved collections schema
const cron = require('node-cron');

// Function to check and approve collections
const checkCollections = async () => {
  try {
    // Find all users with collections that are not approved yet
    const usersWithPendingCollections = await users.find({
      'collections.0': { $exists: true }, // Find users with at least one collection
      'collections.approved': false // Ensure only collections that aren't approved yet
    });
    // Loop through each user and check their collections
    for (const user of usersWithPendingCollections) {
      let userModified = false;
      // Iterate through each collection within the user's collections
      for (const collection of user.collections) {
        // Check if the collection is not approved yet and has one or more NFTs
        if (!collection.approved && collection.nfts.length >= 1) {
          collection.approved = true; // Approve the collection
          userModified = true; // Mark the user as modifie
          // Create an entry for the approved collections schema
          const items = {
            _id: collection._id, 
            artiste: collection.artiste,
            profilePic: collection.profilePic,
            nfts: collection.nfts,
            itemName: collection.itemName,
            description: collection.description,
            approved: true,
          };
          // Save the approved collection to the ApprovedCollections schema
          await ApprovedCollections.create(items);
        }
      }

      // If the user was modified, save the changes
      if (userModified) {
        await user.save(); // Save the modified user document
      }
    }

    console.log('Checked collections for approval');
  } catch (error) {
    console.error('Error checking collections:', error);
  }
};

module.exports = checkCollections;


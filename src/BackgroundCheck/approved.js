const mongoose = require('mongoose');
const users = require('../Models/UserSchema'); // Your user model
const ApprovedCollections = require('../Models/LatestSchema'); // The approved collections schema
const cron = require('node-cron');

// Function to check and approve collections
const checkCollections = async () => {
  try {
    // Find all users with more than one item in their collections
    const usersWithMultipleCollections = await users.find({
      'collections.0': { $exists: true }, // Find users with at least two items
      'collections.approved': false // Ensure only collections that aren't approved yet
    });
    for (const user of usersWithMultipleCollections) {
        let userModified = false;
        user.collections.forEach(async (collection) => {
          if (collection.approved === false && user.collections.length >= 1) {
            collection.approved = true;
            userModified = true; // Flag to indicate that the user was modified
            
            const items = { 
              artiste: collection.artiste,
              profilePic: collection.profilePic,
              nfts: collection.nfts,
              itemName: collection.itemName,
              description: collection.description,
              approved: true,
            };
            const latest = await ApprovedCollections.create(items);
          }
        });
        if (userModified) {
          await user.save(); // Only save if something was modified
        }
      }
    
    console.log('Checked collections for approval');
  } catch (error) {
    console.error('Error checking collections:', error);
  }
};

module.exports = checkCollections

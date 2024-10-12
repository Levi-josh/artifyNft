const users = require('../../Models/UserSchema')
const mongoose = require('mongoose');
const trendCols = require('../../Models/TrendSchema')
const latestCols = require('../../Models/LatestSchema')
const { bucket} = require('../../Utils/FirebaseCred')
const path = require('path')

const postNfts = async (req, res, next) => { 
    const{itemName,price,colId} = req.body; // Extract text from the form
    const filename = req.file.originalname; // Use originalname to get the file's original name
    const fileExtension = path.extname(filename);
    const blob = bucket.file(Date.now() + fileExtension);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      blobStream.on('error', (err) => {
        res.status(500).json({ error: err.message });
      });
      blobStream.on('finish', async () => {
        await blob.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        try {
          const items={
          nftImage:publicUrl ,
          itemName,
          price,
          approved:users.balance<0?false:true,
          } 
          if (users.balance<0) {
            await users.updateOne({'collections._id':colId}, {$push:{'collections.$[elem].nfts':items}},{arrayFilters: [{ "elem._id":colId}] })
            throw new Error('you must have a gas fee of 0.2 eth to mint these nfts')   
          } else{
            await users.updateOne({'collections._id':colId},{$push:{'collections.$[elem].nfts':items}},{arrayFilters: [{ "elem._id":colId}] } )
            res.status(200).json({ message: 'item created successfully'});
          }
        } catch (err) {
        next(err)
        }
      });
  
blobStream.end(req.file.buffer);
}
const postTrendingNfts = async (req, res, next) => { 
    const{itemName,price,colId} = req.body; // Extract text from the form
    const filename = req.file.originalname; // Use originalname to get the file's original name
    const fileExtension = path.extname(filename);
    const blob = bucket.file(Date.now() + fileExtension);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      blobStream.on('error', (err) => {
        res.status(500).json({ error: err.message });
      });
      blobStream.on('finish', async () => {
        await blob.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        try {
          const items={
          nftImage:publicUrl ,
          itemName,
          price,
          approved:true,
          } 
          await trendCols.updateOne({_id:colId},{$push:{nfts:items}})
          res.status(200).json({ message: 'item created successfully'});
        } catch (err) {
        next(err)
        }
      });  
blobStream.end(req.file.buffer);
}
const postLatestNfts = async (req, res, next) => { 
    const{itemName,price,colId} = req.body; // Extract text from the form
    const filename = req.file.originalname; // Use originalname to get the file's original name
    const fileExtension = path.extname(filename);
    const blob = bucket.file(Date.now() + fileExtension);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      blobStream.on('error', (err) => {
        res.status(500).json({ error: err.message });
      });
      blobStream.on('finish', async () => {
        await blob.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        try {
          const items={
          nftImage:publicUrl ,
          itemName,
          price,
          approved:true,
          } 
          await latestCols.updateOne({_id:colId},{$push:{nfts:items}})
          res.status(200).json({ message: 'item created successfully'}); 
        } catch (err) {
        next(err)
        }
      });
  
blobStream.end(req.file.buffer);
}
const postPhotoNfts = async (req, res, next) => { 
    const{itemName,price,colId} = req.body; // Extract text from the form
    const filename = req.file.originalname; // Use originalname to get the file's original name
    const fileExtension = path.extname(filename);
    const blob = bucket.file(Date.now() + fileExtension);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      blobStream.on('error', (err) => {
        res.status(500).json({ error: err.message });
      });
      blobStream.on('finish', async () => {
        await blob.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        try {
          const items={
          nftImage:publicUrl ,
          itemName,
          price,
          approved:true,
          } 
          await latestCols.updateOne({_id:colId},{$push:{nfts:items}})
          res.status(200).json({ message: 'item created successfully'}); 
        } catch (err) {
        next(err)
        }
      });
  
blobStream.end(req.file.buffer);
}
const postPopNfts = async (req, res, next) => { 
    const{itemName,price,colId} = req.body; // Extract text from the form
    const filename = req.file.originalname; // Use originalname to get the file's original name
    const fileExtension = path.extname(filename);
    const blob = bucket.file(Date.now() + fileExtension);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      blobStream.on('error', (err) => {
        res.status(500).json({ error: err.message });
      });
      blobStream.on('finish', async () => {
        await blob.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        try {
          const items={
          nftImage:publicUrl ,
          itemName,
          price,
          approved:true,
          } 
          await latestCols.updateOne({_id:colId},{$push:{nfts:items}})
          res.status(200).json({ message: 'item created successfully'}); 
        } catch (err) {
        next(err)
        }
      });
  
blobStream.end(req.file.buffer);
}

const postCollectionPfp = async (req, res, next) => { 
  const{id,colName,description,artiste} = req.body; // Extract text from the form
  const filename = req.file.originalname; // Use originalname to get the file's original name
  const fileExtension = path.extname(filename);
  const blob = bucket.file(Date.now() + fileExtension);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      try {
        const collectionId = new mongoose.Types.ObjectId(); 
        const items={
          _id: collectionId,
          itemName:colName,
          profilePic:publicUrl,
          description,
          nfts:[],
          approved:false,
          artiste
        } 
        await users.updateOne({_id:id},{$push:{collections:items}});
        res.status(200).json({_id: collectionId})
      } catch (err) {
      next(err)
      }
    });
    blobStream.end(req.file.buffer);
  }
const postLatestCols = async (req, res, next) => { 
  const{colName,description,artiste} = req.body; // Extract text from the form
  if (!bucket) {
    console.error('Bucket not initialized');
    return res.status(500).json({ error: 'Firebase storage bucket is not initialized' });
  }
  const filename = req.file.originalname; // Use originalname to get the file's original name
  const fileExtension = path.extname(filename);
  const blob = bucket.file(Date.now() + fileExtension);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobStream.on('error', (err) => {
      console.log(err)
      res.status(500).json({ error: err.message });
    });
    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      console.log('File uploaded. Public URL:', publicUrl);
      try {
        const items={
          itemName:colName,
          profilePic:publicUrl,
          description,
          approved:true,
          artiste,
          nfts:[],

        } 
        const latest = await latestCols.create(items);
        res.status(200).json(latest)
      } catch (err) {
        console.log(err)
      next(err)
      }
    });
    blobStream.end(req.file.buffer);
  }
const postTrendingCols = async (req, res, next) => { 
  const{colName,description,artiste} = req.body; // Extract text from the form
  const filename = req.file.originalname; // Use originalname to get the file's original name
  const fileExtension = path.extname(filename);
  const blob = bucket.file(Date.now() + fileExtension);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      try {
        const items={
          itemName:colName,
          profilePic:publicUrl,
          description,
          nfts:[],
          approved:true,
          artiste
        } 
       const trending =  await trendCols.create(items)
       res.status(200).json(trending)
      } catch (err) {
      next(err)
      }
    });
blobStream.end(req.file.buffer);
}
const postPopCols = async (req, res, next) => { 
  const{colName,description,artiste} = req.body; // Extract text from the form
  const filename = req.file.originalname; // Use originalname to get the file's original name
  const fileExtension = path.extname(filename);
  const blob = bucket.file(Date.now() + fileExtension);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      try {
        const items={
          itemName:colName,
          profilePic:publicUrl,
          description,
          nfts:[],
          approved:true,
          artiste
        } 
       const trending =  await trendCols.create(items)
       res.status(200).json(trending)
      } catch (err) {
      next(err)
      }
    });
blobStream.end(req.file.buffer);
}
const postPhotoCols = async (req, res, next) => { 
  const{colName,description,artiste} = req.body; // Extract text from the form
  const filename = req.file.originalname; // Use originalname to get the file's original name
  const fileExtension = path.extname(filename);
  const blob = bucket.file(Date.now() + fileExtension);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
    blobStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      try {
        const items={
          itemName:colName,
          profilePicp:publicUrl,
          description,
          nfts:[],
          approved:true,
          artiste
        } 
       const trending =  await trendCols.create(items)
       res.status(200).json(trending)
      } catch (err) {
      next(err)
      }
    });
blobStream.end(req.file.buffer);
}





module.exports = {postNfts,postCollectionPfp,postTrendingNfts,postTrendingCols,postLatestCols,postLatestNfts,postPopCols,postPhotoCols};
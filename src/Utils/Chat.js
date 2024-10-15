const socketIO = require('socket.io');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')
const transporter = require('../Middleware/Nodemailer')
const user = require('../Models/UserSchema'); // Assuming this is the Mongoose model
const updateMessages = async (id, details,admin) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }
    const chatId = new ObjectId(id)
    const filter = admin?{ 'adminchats._id': chatId }:{'clientChats._id':chatId}
    const update = admin?{ $push: { 'adminchats.$[elem].messages': details }}:{$push:{'clientChats.messages':details}}; // Ensure the key is 'messages'
    const update2 = {
        arrayFilters: [{ "elem._id":chatId }] 
       }
    console.log('Filter:', filter);
    console.log('Update:', update);
    console.log('Update:', details);
    // Perform the update
    const updated = admin? await user.updateOne(filter, update, update2):await user.updateOne(filter, update)
    console.log('Update Result:', updated);
    if (updated.matchedCount === 0) {
      console.log('No documents matched the provided query.');
    }
    if (updated.modifiedCount === 0) {
      console.log('The document was found but the update did not result in any changes.');
    }
  } catch (error) {
    console.error('Error updating message:', error);
  }
};
const formatTime = (timestamp)=> {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / 60000);
  if (diffInMinutes < 1){
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  }
};
const sendMail = (timestamp)=> {
  const now = new Date();
  if(!timestamp){
    return true;
  }
  const messageTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / 60000);
  const hours = Math.floor(diffInMinutes / 60);
  if (hours < 24 ) {
    return false;
  } else {
    return true;
  }

};
function handleSocketIO(server) {
  const io = socketIO(server, {
    cors: {
      origin: ["http://localhost:3000", 'https://art-work-khaki.vercel.app'],// Replace with your frontend URL
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
  io.on('connection', async (socket) => {
    console.log(`${socket.id} connected`);
    socket.on('setCustomId', async (customId) => {
      socket.customId = customId;
      console.log(`Socket ID ${socket.id} is now associated with Custom ID ${socket.customId}`);
      const a = await user.findOneAndUpdate({ _id: customId }, { socketId: socket.id }, { upsert: true });
      console.log(`update socket ${a}`)
    });
    socket.on('private chat', async (data) => {
      console.log(data)
      const { from, to, text,timestamp } = data;
      const chatdetails = {
        from,
        to,
        text,
        timestamp
      };
      console.log(chatdetails)
      const chatId = new ObjectId(to)
      const recipient = await user.findOne({ _id: chatId });
      const recipientChatId = recipient?.admin?recipient.adminchats.find(prev=>prev.userId == from):recipient?.clientChats
      const isAdmin2 = recipient?.admin
      const sender = await user.findOne({ _id: from });
      const senderChatId = sender.admin?sender.adminchats.find(prev=>prev.userId == to):sender.clientChats
      const isAdmin1 = sender.admin
      console.log(sender.socketId)
      const lastmsg = senderChatId.messages[senderChatId.messages.length - 1]
      console.log(lastmsg)
      
      // if(!sender.admin && sendMail(lastmsg?.timestamp)){
      //   const mailOptions = {
      //     from: process.env.EMAIL_USER,
      //     to: 'levikingdavid4040@gmail.com',
      //     subject: 'You have a new message',
      //     html: `
      //     <p>artifyNft user</p>
      //     <p><strong>mesage:</strong> ${text}</p>
      //     <p><strong>timesent:</strong> ${formatTime(Date.now())}</p>`
      //   }
      //   console.log('ran')
      //   await transporter.sendMail(mailOptions); 
      // }
      const recipientChatIdString = recipientChatId._id.toString();
      const senderChatIdString = senderChatId._id.toString();
    if (recipient && recipient.socketId) {
      // Recipient is online
      io.to(recipient.socketId).emit('private chat', { from, to, text,timestamp });
    } else {
      // Recipient is offline
      console.log(`Recipient ${to} is not currently connected.`);
    }
    // Always send text back to sender and save to both parties' chat history
    if (sender.socketId) {
      io.to(sender.socketId).emit('private chat', { from, to, text,timestamp });
    }
    await updateMessages(recipientChatIdString, chatdetails,isAdmin2);
    await updateMessages(senderChatIdString, chatdetails,isAdmin1);
  });
    socket.on('disconnect', async () => {
      console.log(`User with Socket ID ${socket.id} and Custom ID ${socket.customId} disconnected`);
      // Optionally, you can handle the disconnection logic, such as marking the user as offline in the database
      if (socket.customId) {
        await user.findOneAndUpdate({ _id: socket.customId }, { socketId: null });
      }
    });
  });
}

module.exports = handleSocketIO;
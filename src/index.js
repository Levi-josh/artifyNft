require('dotenv').config()
const express = require('express')
const mongodb = require('./Utils/Dbconnect')
const App = express();
const cors = require('cors')
const bodyparser= require('body-parser');
const port = process.env.port || 3500;
const http = require('http')
const server = http.createServer(App);
const handleSocketIO = require('./Utils/Chat');
const path = require('path');
const fs = require('fs');
const errorhandler = require("./Middleware/Error")
const imgRoutes = require('./Routes/imgRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');
const ArtRoutes = require('./Routes/ArtRoutes')
const walletRoute = require('./Routes/walletRoutes')
const userRoute = require('./Routes/UserSchema')
const cron = require('node-cron');
const checkCollections = require('./BackgroundCheck/approved')


const corsOptions = {
    origin: ['http://localhost:3000', 'https://art-work-khaki.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    credentials: true, // Allow cookies and credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any headers you're using
  };
  
App.use(cors(corsOptions));
App.options('*', cors());
App.use(express.json())
App.use(bodyparser.json())
// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}
App.use(AuthRoutes)
App.use(imgRoutes)
App.use(ArtRoutes)
App.use(walletRoute)
App.use(userRoute)
cron.schedule('*/10 * * * *', () => {
    console.log('Running scheduled collection check...');
    checkCollections();
});
App.use(errorhandler)
App.use('/uploads', express.static(path.join(__dirname, 'uploads')));

handleSocketIO(server);
const startServer = async () => {
    try {
        await mongodb();
        console.log("connected")
        server.listen(port, () => console.log(`port is running on ${port}`))
    } catch (error) {
        console.log(error)
    }
}
startServer();
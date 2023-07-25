require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./database/connect');
const userRoutes = require('./routes/userRoutes');
const businessRoute = require('./routes/businessRoute')
const booingRoutes = require('./routes/bookingRoute')
const commentingRoutes = require('./routes/commentingRoutes')


const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const upload = require('./uploads/upload');

app.use(
    "/",
    express.static(__dirname)
);

app.use(userRoutes)
app.use(businessRoute)
app.use(booingRoutes)
app.use(commentingRoutes)
app.use(cors())

// const server = require('./serverSetup')
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


// This is the code to send image or files via socket.io


server.listen(5000)

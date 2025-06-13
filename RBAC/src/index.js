const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const authroutes = require('./routes/authroutes.js');
const userRoutes = require('./routes/userRoutes.js')

dbConnect();
const app = express();

//Middleware
app.use(express.json());

// Routes
app.use("/api/auth",authroutes);
app.use("/api/users",userRoutes);

// start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT,() => {
    console.log(`Server is Runing on PORT : ${PORT}`);
})
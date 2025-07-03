const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database is connected Successfully'))
.catch((err) => {
    console.log('Database is not connected, something has gone wrong',err);
})



app.listen(5000,() => {
    console.log(`Backend server is runing`);
})
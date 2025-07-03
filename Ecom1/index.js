const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database is connected Successfully'))
.catch((err) => {
    console.log('Database is not connected, something has gone wrong',err);
})

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute) 




app.listen(process.env.PORT || 5000,() => {
    console.log(`Backend server is runing : ${process.env.PORT}`);
})
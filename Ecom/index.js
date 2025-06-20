const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();

app.use(express.json());

const userRoute = require('./routes/user.js');
mongoose
 .connect(process.env.MONGO_URL)
 .then(() => console.log('DBConnection Successfull'))
 .catch((err) => {
    console.log(err);
 });
app.get('/',(req,res) => {
    res.send('helllo Rakesh');
})
 //app.use('/api/user',userRoute)

 const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log("Backend server is runing");
})
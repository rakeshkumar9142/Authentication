const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/user.js');
const authRoute = require('./routes/auth.js');

const app = express();
app.use(express.json());

mongoose
 .connect(process.env.MONGO_URL)
 .then(() => console.log('DBConnection Successfull'))
 .catch((err) => {
    console.log(err);
 });


 app.use('/api/auth',authRoute)
 app.use('/api/users',userRoute)

 const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server is runing on PORT : ${PORT}`);
})
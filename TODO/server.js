const express = require('express');
const session = require('express-session');
const dbConnect = require('./config/db.js')


const dotenv = require('dotenv').config(); 
const PORT = process.env.PORT;

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.get('/',(req,res) => {
    res.end('Hello');
})

app.use('/api/auth',authRoutes);

app.listen(PORT,() => {
    console.log(`Server is Runing on PORT : ${PORT}`);
})


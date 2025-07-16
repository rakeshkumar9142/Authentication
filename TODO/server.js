const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');

const PORT = process.env.PORT;



const app = express();

app.get('/',(req,res) => {
    res.end('Hello');
})

app.listen(PORT,() => {
    console.log(`Server is Runing on PORT : ${PORT}`);
})


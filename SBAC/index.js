const express = require('express');

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended : false}))

app.get('/',(req,res) => {
    res.render('home');
})

app.get('/login',(req,res) => {
    res.render('login')
})

app.post('/login',(req,res) => {
    if(req.body.name === "john" && req.body.password === "123") {
        // Create sesion and starts user logged details
    } else {
        res.render('login',{error : "wrong credentials"})
    }
})

app.listen(3000,() => {
    console.log('Server is runing on PORT : 3000');
})
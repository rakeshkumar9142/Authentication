const express = require('express');
const session = require('express-session')
const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended : false}))

app.use(session({
    secret : 'my-sesion-secret',
    resave : true,
    saveUninitialized : false,
}))

app.get('/',(req,res) => {
    res.render('home');
})

app.get('/login',(req,res) => {
    res.render('login',{error : null})
})

app.post('/login',(req,res) => {
    if(req.body.name === "john" && req.body.password === "123") {
     req.session.user = {id:1,name : 'john',sname : 'John Doe'}
     res.redirect('/');
       } else {
        res.render('login',{error : "wrong credentials"})
    }
})
app.listen(3000,() => {
    console.log('Server is runing on PORT : 3000');
})
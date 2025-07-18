const express = require('express');
const session = require('express-session')
const {checkLoggedIn,bypassLogin} = require('./middleware.js');
const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended : false}))


app.use(session({
    secret : 'my-sesion-secret',
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 10000
    }
}))



app.use((req,res,next) => {
    res.locals.user = req.session.user;
    next();
})

app.get('/',checkLoggedIn,(req,res) => {
    res.render('home');
})

app.get('/login',bypassLogin,(req,res) => {
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

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/')
})

app.listen(3000,() => {
    console.log('Server is runing on PORT : 3000');
})



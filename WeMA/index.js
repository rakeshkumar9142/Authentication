const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.static('./public'))
app.use(express.json());


//states
const userStore = {}

app.post('/register',(req,res) => {
    const {username,password} = req.body;
    const id = `user_${Date.now()}`

    const user = {
        id,
        username,
        password
    }

    userStore[id] = user

    console.log(`Register successfull`,userStore[id]);

    return res.json({id})

})

app.listen(PORT,() => {
    console.log(`Server is Runing on PORT : ${PORT}`);
})
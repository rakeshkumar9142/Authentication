const router = require('express').Router();

router.get('/testing',(req,res) => {
    res.send('Hello from the testing')
})



module.exports = router;

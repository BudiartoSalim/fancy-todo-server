const express = require('express');
const router = express.Router();
const todosRouter = require('./todos-router.js');

router.get('/', (req, res)=>{
    res.send('ini home')
})

router.use('/todos', todosRouter);

module.exports = router;
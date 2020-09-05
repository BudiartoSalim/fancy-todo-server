const express = require('express');
const router = express.Router();
const todosRouter = require('./todos-router.js');
const usersRouter = require('./users-router.js');

router.get('/', (req, res) => {
  res.send('ini home')
})

router.use('/todos', todosRouter);
router.use('/users', usersRouter);

module.exports = router;
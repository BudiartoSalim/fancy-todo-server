const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes/index.js');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);


//error handler middleware
app.use(function (err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
        res.status(400).json(err);
    } else if (err === 'InvalidLogin') {
        res.status(400).json({ errors: ["Invalid Username/Password"] })
    } else if (err.name === 'SequelizeConnectionError') {
        res.status(404).json(err);
    } else if (err === 'Not found') {
        res.status(404).json({ errors: ["Not found"] })
    } else {
        res.status(500).json({ errors: ['Internal Server Error'] });
    }
})

app.listen(PORT, () => {
    console.log(`app is running at http://localhost:${PORT}`)
})
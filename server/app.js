const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./routes/index.js');
require('dotenv').config();
const cors = require('cors');
const HTMLErrorCheckHandler = require('./middlewares/error-handler.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);


//error handler middleware
app.use(HTMLErrorCheckHandler);

app.listen(PORT, () => {
  console.log(`app is running at http://localhost:${PORT}`)
})
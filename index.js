'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const summaryRouter = require('./route/index');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/books', summaryRouter);
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});

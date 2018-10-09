'use strict';

const express = require('express');
const joivalidation = require('../JOIValidator/JOIValidation.js'); 
const router = express.Router();

const summaryController = require('../BookController/BookList');

router.get('/', summaryController.getAllBookData);
router.get('/search',joivalidation.Validategetrequest);
router.post('/add',joivalidation.Validatepostrequest);
router.put('/update',joivalidation.Validateupdaterequest)
module.exports = router;
const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const City = require('../models/city');

router
    .get('/', (req, res, next) => {
        
    })
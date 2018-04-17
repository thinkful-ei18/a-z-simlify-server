'use strict';

const express = require('express');
const router = express.Router();

router.get('questions', (req, res, next) => {
  return res.json('♪ Sul Sul')
    .catch(err => next(err));
});